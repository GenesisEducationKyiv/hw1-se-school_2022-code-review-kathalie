import {EmailController} from "./controllers/email-controller.js";
import {EmailService} from "./services/email-service.js";
import {NodeMailer} from "./data-access/mailers/node-mailer.js";
import {EmailRepository} from "./data-access/repositories/email-repository.js";
import {JsonFileManager} from "../../common/json-file-manager.js";
import {FileNamesEmail} from "./common/constants/file-names.email.js";
import {CommandBus} from "@nestjs/cqrs";

const nodeMailer = new NodeMailer();
export const emailRepository = new EmailRepository(new JsonFileManager(FileNamesEmail.SUBSCRIBERS));
export const emailService = new EmailService(emailRepository, nodeMailer);
export const emailController = new EmailController(emailService);