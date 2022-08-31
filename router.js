import Router from 'express';

import * as rateController from './controllers/rate-controller.js';
import * as emailController from './controllers/email-controller.js';
import { ApiPath } from './constants/api-paths.js';

const router = new Router();

router.get(ApiPath.GET_RATE, rateController.getRate);
router.post(ApiPath.SUBSCRIBE, emailController.subscribeEmail);
router.post(ApiPath.SEND_EMAILS, emailController.sendEmails);

export default router;