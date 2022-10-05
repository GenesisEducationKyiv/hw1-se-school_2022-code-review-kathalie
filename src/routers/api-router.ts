import Router from 'express';

import { RateController } from '../controllers/rate-controller.js';
import { EmailController } from '../controllers/email-controller.js';
import { ApiPaths } from '../constants/api-paths.js';
import { RateService } from "../services/api/rate-service.js";
import {EmailService} from "../services/api/email-service.js";
import {EmailRepository} from "../repositories/email-repository.js";
import {JsonFileManager} from "../file-managers/json-file-manager.js";
import {FileNames} from "../constants/file-names.js";

const apiRouter = new Router();

const rateService = new RateService();
const rateController = new RateController(rateService);

const emailRepository = new EmailRepository(new JsonFileManager(FileNames.SUBSCRIBERS));
const emailService = new EmailService(emailRepository, rateService);
const emailController = new EmailController(emailService);

apiRouter.get(ApiPaths.GET_RATE, (req, res) => rateController.getRate(req, res));
apiRouter.post(ApiPaths.SUBSCRIBE, (req, res) => emailController.subscribeEmail(req, res));
apiRouter.post(ApiPaths.SEND_EMAILS, (req, res) => emailController.sendEmails(req, res));

export default apiRouter;