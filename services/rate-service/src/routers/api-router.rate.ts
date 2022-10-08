import Router from 'express';
import {ApiPaths} from "../common/constants/api-paths.rate";
import {rateController} from "../app-config.rate";

const apiRouter = new Router();

apiRouter.get(ApiPaths.GET_RATE, (req, res) => rateController.getRate(req, res));

export default apiRouter;