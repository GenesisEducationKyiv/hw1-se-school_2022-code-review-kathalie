import Router from 'express';

import * as rateController from '../controllers/rate-controller.js';
import * as emailController from '../controllers/email-controller.js';
import { ApiPaths } from '../constants/api-paths.js';

const apiRouter = new Router();

apiRouter.get(ApiPaths.GET_RATE, rateController.getRate);
apiRouter.post(ApiPaths.SUBSCRIBE, emailController.subscribeEmail);
apiRouter.post(ApiPaths.SEND_EMAILS, emailController.sendEmails);

export default apiRouter;