import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    { timestamps: true }
);

export const Conversation = mongoose.model("Conversation", ConversationSchema);