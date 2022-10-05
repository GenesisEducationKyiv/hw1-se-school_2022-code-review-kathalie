import {RateService} from "./services/api/rate-service.js";
import {RateController} from "./controllers/rate-controller.js";
import {EmailRepository} from "./repositories/email-repository.js";
import {JsonFileManager} from "./file-managers/json-file-manager.js";
import {FileNames} from "./constants/file-names.js";
import {EmailService} from "./services/api/email-service.js";
import {EmailController} from "./controllers/email-controller.js";
import {getRateChain} from "./chain-config.js";
import {RateCache} from "./services/cache/rate-cache.js";

export const rateChain = getRateChain();
export const rateService = new RateService(new RateCache(rateChain));
export const rateController = new RateController(rateService);

export const emailRepository = new EmailRepository(new JsonFileManager(FileNames.SUBSCRIBERS));
export const emailService = new EmailService(emailRepository, rateService);
export const emailController = new EmailController(emailService);