import {Request} from "express";
import {User} from "../entities/User";

export interface RequestApplication extends Request {
    userAuth: User,
}
