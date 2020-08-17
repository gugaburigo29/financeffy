import * as Express from "express"
import {Bootstrap} from "./bootstrap";
import UserRouter from "./routes/UserRouter";
import * as cors from "cors";
import ErrorHandlerMiddleware from "./middlewares/ErrorHandlerMiddleware";
import CardRouter from "./routes/CardRouter";
import CategoryRouter from "./routes/CategoryRouter";
import TituloRouter from "./routes/TituloRouter";

class App {

    private app: Express.Application

    constructor() {
        this.app = Express();
    }

    async start() {
        await Bootstrap.startDB();
        await Bootstrap.runMigration();
        this.startBeforeMiddlewares();
        this.startRoutes();
        this.startAfterMiddlewares();
        this.startServer();
    }

    private startBeforeMiddlewares() {
        this.app.use(cors())
        this.app.use(Express.urlencoded({ extended: false }));
        this.app.use(Express.json());
    }

    private startAfterMiddlewares() {
        this.app.use(ErrorHandlerMiddleware.useWithError)
    }

    private startRoutes() {
        this.app.use('/users', UserRouter);
        this.app.use('/cards', CardRouter);
        this.app.use('/categories', CategoryRouter);
        this.app.use('/titulos', TituloRouter);
    }

    private startServer() {
        this.app.listen(3333, () => console.log('[APP] Start application server on http://localhost:3333'));
    }

}

export default new App();
