import Router from 'express';
import { getAllConversations, addConversation } from '../controllers/conversationsController.js';
const conversationsRouter = Router();

conversationsRouter.get('/:id', getAllConversations);
conversationsRouter.post('/', addConversation);

export default conversationsRouter;