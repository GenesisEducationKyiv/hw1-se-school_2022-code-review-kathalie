import Router from 'express';

import { RateController } from '../controllers/rate-controller.js';
import { EmailController } from '../controllers/email-controller.js';
import { ApiPaths } from '../constants/api-paths.js';
import { RateService } from "../services/api/rate-service";
import {EmailService} from "../services/api/email-service";
import {EmailRepository} from "../repositories/email-repository";
import {JsonFileManager} from "../file-managers/json-file-manager";
import {FileNames} from "../constants/file-names";

const apiRouter = new Router();

const rateService = new RateService();
const rateController = new RateController(rateService);

const emailRepository = new EmailRepository(new JsonFileManager(FileNames.SUBSCRIBERS));
const emailService = new EmailService(emailRepository, rateService);
const emailController = new EmailController(emailService);

apiRouter.get(ApiPaths.GET_RATE, rateController.getRate);
apiRouter.post(ApiPaths.SUBSCRIBE, emailController.subscribeEmail);
apiRouter.post(ApiPaths.SEND_EMAILS, emailController.sendEmails);

export default apiRouter;