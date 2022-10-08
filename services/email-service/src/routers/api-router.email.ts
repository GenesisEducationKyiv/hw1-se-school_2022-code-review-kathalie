import Router from 'express';

import {ApiPaths} from "../../../rate-service/src/common/constants/api-paths.rate.js";
import {emailController} from "../app-config.email.js";

const apiRouter = new Router();

apiRouter.post(ApiPaths.SUBSCRIBE, (req, res) => emailController.subscribeEmail(req, res));
apiRouter.post(ApiPaths.SEND_EMAILS, (req, res) => emailController.sendEmails(req, res));

export default apiRouter;