import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  Button,
  Modal,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import MessageForm from "./MessageForm";
import MessageItem from "./MessageItem";
import { useAuth } from "../AuthContext";
import api from "../api/api";
import { expiredToken } from "../utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const MessageList = () => {
  const [editingMessage, setEditingMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [updatedList, setUpdatedList] = useState(false);
  const [messages, setMessages] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("TOKEN");

  const { logout } = useAuth();

  const handleOpen = () => {
    setEditingMessage(null);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get("/messages", {
          headers: {
            Authorization: token,
          },
        });
        setMessages(response.data);
        setUpdatedList(false);
      } catch (error) {
        console.log(error);
        expiredToken(enqueueSnackbar, error);
        enqueueSnackbar("Failed to fetch messages", { variant: "error" });
      }
    };
    fetchMessages();
  }, [enqueueSnackbar, updatedList]);

  const onEdit = (message) => {
    setEditingMessage(message);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/messages/${id}`, {
        headers: { Authorization: token },
      });
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== id)
      );
      enqueueSnackbar("Message deleted successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to delete message", { variant: "error" });
    }
  };

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
        <Box
          sx={{
            marginBottom: 3,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Create a new message
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 3, mb: 2 }}
            onClick={logout}
          >
            Logout
          </Button>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 800 }}>
            <MessageForm
              handleClose={handleClose}
              setOpen={setOpen}
              editingMessage={editingMessage}
              setUpdatedList={setUpdatedList}
            />
          </Box>
        </Modal>

        <Box
          sx={{
            backgroundColor: "background.paper",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Messages
          </Typography>
          <Paper
            sx={{
              maxHeight: 400,
              overflow: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <List>
              {messages?.map((message) => (
                <ListItem key={message._id}>
                  <MessageItem
                    message={message}
                    onEdit={onEdit}
                    onDelete={handleDelete}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default MessageList;
