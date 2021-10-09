import { Router } from "express";
import * as userController from './UsersController'

const router = Router();

router.get('/users', userController.getUsers);

router.get('/users/:username&:password', userController.getUser);

router.post('/users', userController.createUser);

router.delete('/users/:id', userController.deleteUser);

router.put('/users/:id', userController.updateUser);

export default router