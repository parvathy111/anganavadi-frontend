import { useEffect, useState } from "react";
import WorkerLayout from "../layouts/WorkerLayout";
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

export default function WorkerSendBeneficiary() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchBeneficiaries();
    }
  }, [user]);

  const fetchBeneficiaries = async () => {
    try {
      const resPregLactWomen = await api.get(`/beneficiaries/preglactwomen`);
      const resParents = await api.get(`/beneficiaries/parents`);
      const combined = [...resPregLactWomen.data, ...resParents.data];
      setBeneficiaries(combined);
    } catch (err) {
      console.error("Failed to load beneficiaries:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBeneficiaries = beneficiaries.filter((b) => {
    const nameMatch =
      b.childname?.toLowerCase().includes(searchName.toLowerCase()) ||
      b.fullname?.toLowerCase().includes(searchName.toLowerCase());
    const roleMatch =
      searchRole === "" || b.role?.toLowerCase().includes(searchRole.toLowerCase());
    return nameMatch && roleMatch;
  });

  const handleOpenChat = async (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setMessageInput("");
    try {
      const res = await api.get(
        `/messages/conversation/${user._id}/${beneficiary._id}`
      );
      setMessages(res.data.data || []);
    } catch (err) {
      console.error("Error loading chat history:", err);
      setMessages([]);
    }
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() === "" || !user || !selectedBeneficiary) return;
    const payload = {
      sender: user._id,
      receiver: selectedBeneficiary._id,
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
    <WorkerLayout>
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <Typography
              variant="h4"
              className="bg-gradient-to-r from-orange-600 to-orange-400 text-transparent bg-clip-text font-bold"
            >
              Send Message
            </Typography>
            <p className="text-gray-600 text-sm">
              Select a Beneficiary to start a conversation.
            </p>
          </div>
          <div className="flex gap-3">
            <TextField
              label="Search by Name"
              variant="outlined"
              size="small"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              className="w-full sm:w-64"
            />
            <TextField
              label="Search by Role (e.g., parent, preglactwomen)"
              variant="outlined"
              size="small"
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
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
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <Paper
            elevation={4}
            className={`p-4 rounded-xl shadow-md transition-all duration-300 ${
              selectedBeneficiary ? "w-full lg:w-1/2" : "w-full"
            } max-h-[500px] overflow-y-auto`}
          >
            {filteredBeneficiaries.length === 0 ? (
              <Typography>No matching beneficiaries found.</Typography>
            ) : (
              filteredBeneficiaries.map((b) => (
                <div
                  key={b._id}
                  className="flex justify-between items-center border-b py-3"
                >
                  <div>
                    <Typography className="font-semibold text-pink-700">
                      {b.role === "parent" ? b.childname : b.fullname || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Email: {b.email}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Role: {b.role}
                    </Typography>
                  </div>
                  <IconButton color="primary" onClick={() => handleOpenChat(b)}>
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                </div>
              ))
            )}
          </Paper>

          {selectedBeneficiary && (
            <Paper
              elevation={4}
              className="p-4 rounded-xl shadow-md w-full lg:w-1/2 flex flex-col justify-between max-h-[500px]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <Typography
                    variant="h6"
                    className="text-pink-700 font-semibold"
                  >
                    Chat with{" "}
                    {selectedBeneficiary.childname || selectedBeneficiary.fullname}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {selectedBeneficiary.email}
                  </Typography>
                </div>
                <IconButton onClick={() => setSelectedBeneficiary(null)}>
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
                  messages.map((msg, index) => {
                    const isSentByCurrentUser =
                      msg.sender === user._id || msg.sender?._id === user._id;
                    return (
                      <div
                        key={index}
                        className={`max-w-[60%] p-2 rounded-lg text-sm ${
                          isSentByCurrentUser
                            ? "bg-blue-100 text-right self-end ml-auto"
                            : "bg-pink-100 text-left self-start"
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
                    );
                  })
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
    </WorkerLayout>
  );
}
