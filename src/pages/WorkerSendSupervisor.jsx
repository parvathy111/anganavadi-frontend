import { useEffect, useState } from "react";
import WorkerLayout from "../layouts/WorkerLayout";
import {
  Typography,
  TextField,
  Paper,
  IconButton,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import api from "../config/axiosinstance";
import { useUser } from "../store/useUser";

export default function WorkerSendSupervisor() {
  const [supervisor, setSupervisor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchSupervisorAndMessages();
    }
  }, [user]);

  const fetchSupervisorAndMessages = async () => {
    try {
      const res = await api.get(`/worker/${user.id}/supervisor`);
      const supervisorData = res.data?.data;

      if (!supervisorData) {
        throw new Error("Supervisor not found");
      }

      setSupervisor(supervisorData);

      const msgRes = await api.get(
        `/messages/conversation/${user.id}/${supervisorData._id}`
      );
      setMessages(msgRes.data.data || []);
    } catch (err) {
      console.error("Error fetching supervisor or messages:", err);
      setSupervisor(null);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() === "" || !supervisor) return;

    const payload = {
      sender: user.id,
      receiver: supervisor._id,
      text: messageInput,
    };

    try {
      await api.post("/messages/send", payload);
      setMessages([
        ...messages,
        { text: messageInput, timestamp: new Date(), sender: user.id },
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
    <WorkerLayout>
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <Typography
            variant="h4"
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-bold"
          >
            Message Supervisor
          </Typography>
          <p className="text-gray-600 text-sm">
            Chat with your assigned supervisor.
          </p>
        </div>

        {supervisor ? (
          <Paper
            elevation={4}
            className="p-4 rounded-xl shadow-md max-h-[500px] flex flex-col"
          >
            <div>
              <Typography
                variant="h6"
                className="text-orange-500 font-semibold"
              >
                Chat with {supervisor.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: {supervisor.email}
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
                      msg.sender === user.id
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
            Supervisor not assigned or not found.
          </Typography>
        )}
      </div>
    </WorkerLayout>
  );
}
