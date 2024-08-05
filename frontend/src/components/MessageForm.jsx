import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import api from "../api/api";

const MessageForm = ({
  handleClose,
  setOpen,
  editingMessage,
  setUpdatedList,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const userId = localStorage.getItem("USER_DATA");
  const token = localStorage.getItem("TOKEN");

  useEffect(() => {
    if (editingMessage && editingMessage?._id) {
      setTitle(editingMessage?.title);
      setDescription(editingMessage?.description);
    }
  }, [editingMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description, userId };

    if (!title || !description) {
      enqueueSnackbar("Please fill in all fields", { variant: "error" });
      return;
    }

    try {
      editingMessage && editingMessage._id
        ? await api.put(`/messages/${editingMessage._id}`, data, {
            headers: {
              Authorization: token,
            },
          })
        : await api.post("/messages", data, {
            headers: {
              Authorization: token,
            },
          });
      enqueueSnackbar("Message created successfully", { variant: "success" });
      setOpen(false);
      setUpdatedList(true);
      setTitle("");
      setDescription("");
    } catch (error) {
      enqueueSnackbar("Failed to create message", { variant: "error" });
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "background.paper",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Create Message
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputLabelProps={{
              style: { color: "#e1e1e6" },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            id="description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputLabelProps={{
              style: { color: "#e1e1e6" },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 1, mb: 1 }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="error"
            sx={{ mt: 1, mb: 1 }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MessageForm;
