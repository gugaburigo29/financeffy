import {NextFunction, Response} from "express";
import {RequestApplication} from "./RequestApplication";

export interface Middleware {
    useWithError?(err: any, request: RequestApplication, response: Response, next: NextFunction): Promise<void>

    use?(request: RequestApplication, response: Response, next: NextFunction): Promise<void>
}
