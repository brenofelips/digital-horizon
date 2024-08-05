import Message from "../models/messageModal.js";
import User from "../models/userModel.js";

export const createMessage = async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newMessage = new Message({ title, description, userId });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: `Failed to create message: ${error.message}` });
  }
};

export const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { title, description, userId } = req.body;
  try {
    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
    }
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { title, description, userId, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: `Failed to update message: ${error.message}` });
  }
};


export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.status(200).json({ message: "Message successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: `Failed to delete message: ${error.message}` });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('userId', '_id username email');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch messages: ${error.message}` });
  }
};

export const getMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findById(id).populate('user', '_id, username email');
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch message: ${error.message}` });
  }
};
