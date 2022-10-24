import Router from 'express';

import {emailController} from "../di.email.js";
import {ApiPaths} from "../../../common/constants/api-paths.js";

const apiRouter = new Router();

apiRouter.post(ApiPaths.SUBSCRIBE, async (req, res) => await emailController.subscribeEmail(req, res));
apiRouter.post(ApiPaths.SEND_EMAILS, (req, res) => emailController.sendEmails(req, res));

export default apiRouter;