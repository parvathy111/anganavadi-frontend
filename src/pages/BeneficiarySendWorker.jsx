import { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Paper,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useUser } from "../store/useUser";
import api from "../config/axiosinstance";
import BeneficiaryLayout from "../layouts/BeneficiaryLayout";

export default function BeneficiarySendWorker() {
  const [worker, setWorker] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchWorkerAndMessages();
    }
  }, [user]);

  const fetchWorkerAndMessages = async () => {
    try {
      const res = await api.get(`/messages/by-anganwadi/${user.anganwadiNo}`);
      const workerData = res.data?.data;

      if (!workerData) throw new Error("Worker not found");

      setWorker(workerData);

      const msgRes = await api.get(
        `/messages/conversation/${user._id}/${workerData._id}`
      );
      setMessages(msgRes.data?.data || []);
    } catch (err) {
      console.error("Error fetching worker or messages:", err);
      setWorker(null);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !worker) return;

    const payload = {
      sender: user._id,
      receiver: worker._id,
      text: messageInput,
    };

    try {
      await api.post("/messages/send", payload);
      setMessages([
        ...messages,
        { text: messageInput, timestamp: new Date(), sender: user._id },
      ]);
      setMessageInput("");
    } catch (err) {
      console.error("Send message error:", err);
      alert("Failed to send message.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <BeneficiaryLayout>
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <Typography
            variant="h4"
            className="bg-gradient-to-r from-orange-600 to-orange-500 text-transparent bg-clip-text font-bold"
          >
            Message Worker
          </Typography>
          <p className="text-gray-600 text-sm">
            Chat with your assigned Anganwadi worker.
          </p>
        </div>

        {worker ? (
          <Paper
            elevation={4}
            className="p-4 rounded-xl shadow-md max-h-[500px] flex flex-col"
          >
            <div>
              <Typography
                variant="h6"
                className="text-orange-600 font-semibold"
              >
                Chat with {worker.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: {worker.email}
              </Typography>
            </div>

            <Divider className="my-3" />

            <div className="flex-1 overflow-y-auto bg-gray-50 rounded p-3 mb-4 min-h-[150px] space-y-2">
              {messages.length === 0 ? (
                <Typography variant="body2" className="text-gray-500">
                  No messages yet.
                </Typography>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[40%] p-2 rounded-md text-sm ${
                      msg.sender === user._id
                        ? "bg-green-100 text-right self-end ml-auto"
                        : "bg-gray-200 text-left self-start"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className="text-[10px] text-gray-500 mt-1 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <TextField
                placeholder="Type a message"
                variant="outlined"
                size="small"
                fullWidth
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </div>
          </Paper>
        ) : (
          <Typography className="text-red-500">
            Worker not assigned or not found.
          </Typography>
        )}
      </div>
    </BeneficiaryLayout>
  );
}
