import Router from 'express';
import { getAllUsers, getUser } from '../controllers/usersController.js';

const usersRouter = Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:identifier', getUser);

export default usersRouter;