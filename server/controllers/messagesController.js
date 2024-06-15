import { Message } from "../models/Message.js"

export const addMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const message = await newMessage.save();
        res.status(201).json(message);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

export const getAllMessages = async (req, res) => {
    const conversationId = req.params.conversationId;
    try {
        const messages = await Message.find({ conversationId: conversationId });
        res.status(200).json({ messages });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}