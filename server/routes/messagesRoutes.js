import Router from 'express';
import { getAllMessages, addMessage } from '../controllers/messagesController.js';
const messagesRouter = Router();

messagesRouter.post('/', addMessage);

messagesRouter.get('/:conversationId', getAllMessages);

export default messagesRouter;