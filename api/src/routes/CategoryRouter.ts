import {Router} from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import {Category} from "../entities/Category";
import {RequestApplication} from "../interfaces/RequestApplication";
import {ResponseUtils} from "../utils/ResponseUtils";

const CategoryRouter = Router();

CategoryRouter.get('/', AuthMiddleware.use, async (req: RequestApplication, res) => {
    const categories = await Category.find({
        where: {
            user: {id: req.userAuth.id}
        }
    });

    return ResponseUtils
        .of(res)
        .createSuccess({categories})
        .send();
});

CategoryRouter.post('/', AuthMiddleware.use, async (req: RequestApplication, res) => {
    let category = Category.from(req.body);
    category = await category.save();

    return ResponseUtils
        .of(res)
        .createSuccess({category})
        .send();
})

export default CategoryRouter;
