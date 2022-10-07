import {RateService} from "./services/api/rate-service.js";
import {RateController} from "./controllers/rate-controller.js";
import {EmailRepository} from "./data-access/repositories/email-repository.js";
import {JsonFileManager} from "./data-access/file-managers/json-file-manager.js";
import {FileNames} from "./common/constants/file-names.js";
import {EmailService} from "./services/api/email-service.js";
import {EmailController} from "./controllers/email-controller.js";
import {getRateChain} from "./chain-config.js";
import {RateCache} from "./services/cache/rate-cache.js";
import {RateRounder} from "./presenters/rate-presenter.js";
import {ApiConfigs} from "./common/constants/api-configs.js";
import {NodeMailer} from "./data-access/mailers/node-mailer.js";

const ratePresenter = new RateRounder(ApiConfigs.PRECISION);
export const rateChain = getRateChain();
export const rateService = new RateService(new RateCache(rateChain), ratePresenter);
export const rateController = new RateController(rateService);

const nodeMailer = new NodeMailer();
export const emailRepository = new EmailRepository(new JsonFileManager(FileNames.SUBSCRIBERS));
export const emailService = new EmailService(emailRepository, nodeMailer, rateService);
export const emailController = new EmailController(emailService);