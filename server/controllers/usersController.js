import { User } from '../models/User.js';
import mongoose from 'mongoose';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUser = async (req, res) => {
    // console.log(req.params);
    const { identifier } = req.params;
    // console.log(identifier);
    try {
        let user;

        if (mongoose.Types.ObjectId.isValid(identifier)) {
            // console.log("hehehe");
            // Identifier is a valid MongoDB ObjectID
            user = await User.findById(identifier);
        } else {
            // Identifier is not an ObjectID, assume it's an email
            // console.log("hehehe");
            user = await User.findOne({ email: identifier });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
