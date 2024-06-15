import { Conversation } from "../models/Conversation.js"

export const getAllConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.id] }
        })
        res.status(200).json({ conversations });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

export const addConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(201).json({ conversation: savedConversation })
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}