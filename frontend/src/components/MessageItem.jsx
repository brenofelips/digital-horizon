import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

const MessageItem = ({ message, onDelete, onEdit }) => {
  return (
    <Card
      sx={{
        marginBottom: 2,
        width: 600,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h5">{message.title}</Typography>
        <Typography>{message.description}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => onEdit(message)} size="small" color="primary">
          Edit
        </Button>
        <Button
          onClick={() => onDelete(message._id)}
          size="small"
          color="secondary"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default MessageItem;
