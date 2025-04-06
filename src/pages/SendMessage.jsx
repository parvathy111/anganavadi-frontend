import { useEffect, useState } from "react";
import SupervisorLayout from "../layouts/SupervisorLayout";
import {
  Typography,
  TextField,
  InputAdornment,
  Paper,
  IconButton,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import api from "../config/axiosinstance";
import { useUser } from "../store/useUser";

export default function SendMessage() {
  const [workers, setWorkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const res = await api.get("/worker/allworkers");
      setWorkers(res.data.data || []);
    } catch (err) {
      console.error("Failed to load workers:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.anganwadiNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenChat = async (worker) => {
    setSelectedWorker(worker);
    setMessageInput("");
    try {
      const res = await api.get(`/messages/conversation/${user.id}/${worker._id}`);
      setMessages(res.data.data || []);
    } catch (err) {
      console.error("Error loading chat history:", err);
      setMessages([]);
    }
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() === "" || !user || !selectedWorker) return;

    const payload = {
      sender: user.id,
      receiver: selectedWorker._id,
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
    <SupervisorLayout>
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Typography
              variant="h4"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-bold"
            >
              Send Message
            </Typography>
            <p className="text-gray-600 text-sm">
              Select an Anganwadi Worker to start a conversation.
            </p>
          </div>

          <TextField
            label="Search by Name or Anganwadi No"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            className="w-full sm:w-64"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Worker List */}
          <Paper
            elevation={4}
            className={`p-4 rounded-xl shadow-md transition-all duration-300 
              ${selectedWorker ? "w-full lg:w-1/2" : "w-full"} 
              max-h-[500px] overflow-y-auto`}
          >
            {filteredWorkers.length === 0 ? (
              <Typography>No matching workers found.</Typography>
            ) : (
              filteredWorkers.map((worker) => (
                <div
                  key={worker._id}
                  className="flex justify-between items-center border-b py-3"
                >
                  <div>
                    <Typography className="font-semibold text-orange-700">
                      {worker.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Anganwadi No: {worker.anganwadiNo}
                    </Typography>
                  </div>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenChat(worker)}
                  >
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                </div>
              ))
            )}
          </Paper>

          {/* Chat Box */}
          {selectedWorker && (
            <Paper
              elevation={4}
              className="p-4 rounded-xl shadow-md w-full lg:w-1/2 flex flex-col justify-between max-h-[500px]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <Typography
                    variant="h6"
                    className="text-orange-600 font-semibold"
                  >
                    Chat with {selectedWorker.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Anganwadi No: {selectedWorker.anganwadiNo}
                  </Typography>
                </div>
                <IconButton onClick={() => setSelectedWorker(null)}>
                  <CloseIcon />
                </IconButton>
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
                          ? "bg-blue-100 text-right self-end ml-auto"
                          : "bg-gray-200 text-left self-start"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className="text-[10px] text-gray-500 mt-1 text-right">
                        {new Date(msg.timestamp).toLocaleTimeString()}
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
          )}
        </div>
      </div>
    </SupervisorLayout>
  );
}
