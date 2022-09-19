import Router from 'express';

import RateController from '../controllers/rate-controller.js';
import EmailController from '../controllers/email-controller.js';
import { ApiPaths } from '../constants/api-paths.js';

const apiRouter = new Router();

apiRouter.get(ApiPaths.GET_RATE, RateController.getRate);
apiRouter.post(ApiPaths.SUBSCRIBE, EmailController.subscribeEmail);
apiRouter.post(ApiPaths.SEND_EMAILS, EmailController.sendEmails);

export default apiRouter;