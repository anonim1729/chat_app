import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import usersRouter from './routes/usersRouter.js';
import conversationsRouter from './routes/conversationsRoutes.js';
import messagesRouter from './routes/messagesRoutes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();
const app = express();
export const server = createServer(app);

// middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('successfully connected to the database'.yellow);
    })
    .catch((err) => {
        console.log(err);
    });

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
};

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    // when connect
    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    // send and get message
    socket.on('sendMessage', ({ senderId, recieverId, text }) => {
        const user = getUser(recieverId);
        io.to(user?.socketId).emit('getMessage', { senderId, text });
    });

    // when disconnect
    socket.on('disconnect', () => {
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});

app.use('/api/user', userRouter);
app.use('/api/users', usersRouter);
app.use('/api/users/conversations', conversationsRouter);
app.use('/api/users/messages', messagesRouter);

server.listen(port, () => {
    console.log(`server running on the port ${port}`);
});
