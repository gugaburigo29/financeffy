import {Router} from "express";
import UserController from "../controllers/UserController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const UserRouter = Router();

UserRouter.post('/signup', UserController.signUp);
UserRouter.post('/signin', UserController.singIn);
UserRouter.get('/', AuthMiddleware.use, UserController.list);

export default UserRouter;
