import {Middleware} from "../interfaces/Middleware";
import {RequestApplication} from "../interfaces/RequestApplication";
import {NextFunction, Response} from "express";

class ErrorHandlerMiddleware implements Middleware {

    async useWithError(err: any, request: RequestApplication, response: Response, next: NextFunction): Promise<any> {
        if (err) {
            return response
                .status(err.code || 400)
                .json({
                    message: err.message || err,
                    error: err.code
                })
        }

        return next();
    }

}

export default new ErrorHandlerMiddleware();
