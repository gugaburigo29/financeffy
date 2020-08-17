import {Response} from "express";

class ResponseUtils {

    private body: unknown;
    private status: number;

    constructor(
        private response: Response
    ) {
    }

    static of(response: Response) {
        return new ResponseUtils(response);
    }

    createSuccess(body: unknown) {
        return this.create(body, 200);
    }

    create(body: unknown, status: number) {
        this.body = body;
        this.status = status;
        return this;
    }

    send() {
        return this.response
            .status(this.status)
            .json(this.body);
    }

}

export {ResponseUtils};
