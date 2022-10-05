import Router from 'express';

import { ApiPaths } from '../constants/api-paths.js';
import {emailController, rateController} from "../app-config.js";

const apiRouter = new Router();

apiRouter.get(ApiPaths.GET_RATE, (req, res) => rateController.getRate(req, res));
apiRouter.post(ApiPaths.SUBSCRIBE, (req, res) => emailController.subscribeEmail(req, res));
apiRouter.post(ApiPaths.SEND_EMAILS, (req, res) => emailController.sendEmails(req, res));

export default apiRouter;