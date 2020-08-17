import {Router} from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import {RequestApplication} from "../interfaces/RequestApplication";
import {Card} from "../entities/Card";
import {ResponseUtils} from "../utils/ResponseUtils";

const CardRouter = Router();

CardRouter.get('/', AuthMiddleware.use, async (req: RequestApplication, res) => {
    const {id: userId} = req.userAuth;

    const cards = await Card.find({
        where: {
            user: {id: userId}
        },
        relations: ['user', 'bank']
    });

    return ResponseUtils
        .of(res)
        .createSuccess({cards})
        .send();
});

CardRouter.post('/', AuthMiddleware.use, async (req: RequestApplication, res) => {
    let card = Card.from(req.body);
    card.user = req.userAuth;
    card = await card.save();

    return ResponseUtils
        .of(res)
        .createSuccess({card})
        .send();
})

export default CardRouter;
