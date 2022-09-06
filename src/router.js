import Router from 'express';

import * as rateController from './controllers/rate-controller.js';
import * as emailController from './controllers/email-controller.js';
import { ApiPaths } from './constants/api-paths.js';

const router = new Router();

router.get(ApiPaths.GET_RATE, rateController.getRate);
router.post(ApiPaths.SUBSCRIBE, emailController.subscribeEmail);
router.post(ApiPaths.SEND_EMAILS, emailController.sendEmails);

export default router;