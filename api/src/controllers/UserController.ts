import * as JWT from "jsonwebtoken";
import {Response} from "express";
import {User} from "../entities/User";
import {RequestApplication} from "../interfaces/RequestApplication";
import {ResponseUtils} from "../utils/ResponseUtils";
import {env} from "../config/env";

interface SignIn {
    email: string;
    password: string;
}

class UserController {

    async signUp(request: RequestApplication, response: Response) {
        let user = User.from(request.body);
        user.id = undefined;

        user = await user.save();

        const token = JWT.sign(String(user.id), env.TOKEN_SECRET);

        user.password = undefined;

        return ResponseUtils
            .of(response)
            .createSuccess({
                user,
                token
            })
            .send();
    }

    async singIn(request: RequestApplication, response: Response) {
        const {password, email} = request.body as SignIn;

        const user = await User.findOne({
            where: {email, password}
        });

        const token = JWT.sign(String(user.id), env.TOKEN_SECRET);

        user.password = undefined;

        return ResponseUtils
            .of(response)
            .createSuccess({token, user})
            .send();
    }

    async list(request: RequestApplication, response: Response) {
        const allUsers = await User.find();
        const usersNoPassword = allUsers.map(user => ({...user, password: undefined}));
        return ResponseUtils
            .of(response)
            .createSuccess(usersNoPassword)
            .send();
    }

}

export default new UserController();
