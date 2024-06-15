import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '10m' });
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email: user.email, token });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

export const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id);
        res.status(201).json({ email: user.email, token });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}