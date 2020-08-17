import {Router} from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import {RequestApplication} from "../interfaces/RequestApplication";
import {ResumeResultQuery, Titulo, TypeTituloEnum} from "../entities/Titulo";
import {ResponseUtils} from "../utils/ResponseUtils";

const TituloRouter = Router();

TituloRouter.get('/', AuthMiddleware.use, async (req: RequestApplication, res) => {
    const titulos = await Titulo.find({
        where: {
            user: {id: req.userAuth.id}
        },
        relations: ['category']
    });

    return ResponseUtils
        .of(res)
        .createSuccess({titulos})
        .send();
});

TituloRouter.post('/', AuthMiddleware.use, async (req: RequestApplication, res) => {
    let titulo = Titulo.from(req.body);
    titulo.user = req.userAuth;
    titulo = await titulo.save();

    return ResponseUtils
        .of(res)
        .createSuccess({titulo})
        .send();
});

TituloRouter.post('/receitas', AuthMiddleware.use, async (req: RequestApplication, res) => {
    let titulo = Titulo.from(req.body);
    titulo.user = req.userAuth;
    await titulo.saveReceita();

    return ResponseUtils
        .of(res)
        .createSuccess({titulo})
        .send();
});

TituloRouter.post('/despesas', AuthMiddleware.use, async (req: RequestApplication, res) => {
    let titulo = Titulo.from(req.body);
    titulo.user = req.userAuth;
    await titulo.saveDespesa();

    return ResponseUtils
        .of(res)
        .createSuccess({titulo})
        .send();
});

TituloRouter.get('/resume', AuthMiddleware.use, async (req: RequestApplication, res, next) => {
    const queryBuilder = Titulo.createQueryBuilder('titulo');
    const result: ResumeResultQuery[] = await queryBuilder
        .select('SUM(titulo.value) as total,titulo.type')
        .where('titulo.user = :id', {id: req.userAuth.id})
        .groupBy('titulo.type')
        .getRawMany();

    try {
        const totalReceitas = result.find(resume => resume.type == TypeTituloEnum.RECEITA)?.total;
        const totalDespesas = result.find(resume => resume.type == TypeTituloEnum.DESPESA)?.total;
        let total = totalDespesas || totalReceitas;

        if (totalDespesas && totalReceitas) {
            total = totalDespesas + totalReceitas;
        }

        return ResponseUtils
            .of(res)
            .createSuccess({
                totalReceitas: totalReceitas || 0,
                totalDespesas: totalDespesas || 0,
                total: total || 0,
            })
            .send();
    } catch (err) {
        next(err)
    }
});

export default TituloRouter;
