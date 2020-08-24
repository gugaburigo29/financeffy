import * as JWT from "jsonwebtoken";
import {NextFunction, Response} from "express";
import {Middleware} from "../interfaces/Middleware";
import {RequestApplication} from "../interfaces/RequestApplication";
import {env} from "../config/env";
import {User} from "../entities/User";

class AuthMiddleware implements Middleware {

    async use(request: RequestApplication, response: Response, next: NextFunction): Promise<void> {
        const token = request.header('X-AUTH-TOKEN');
        const queryToken = request.query['token'];

        if (!token && !queryToken) {
            return next({
                code: 401,
                message: "Token not provided"
            })
        }

        try {
            const userId = JWT.verify(String(token || queryToken), env.TOKEN_SECRET);
            const user = await User.findOne({where: {id: userId}});

            request.userAuth = user;

            return next()
        } catch (err) {
            next({message: 'Error in authentication', code: 401})
        }
    }
}

export default new AuthMiddleware();
