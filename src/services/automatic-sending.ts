import {EmailService} from "./api/email-service.js";
import {EmailRepository} from "../repositories/email-repository";
import {JsonFileManager} from "../file-managers/json-file-manager";
import {FileNames} from "../constants/file-names";
import {RateService} from "./api/rate-service.js";

let rate;
const timeDelay = 1000 * 60 * 10; // 10 min in ms

const rateService = new RateService();
const emailRepository = new EmailRepository(new JsonFileManager(FileNames.SUBSCRIBERS));
const emailService = new EmailService(emailRepository, rateService);

setInterval(await automaticSending, timeDelay, emailService, rateService);

async function automaticSending(emailService: EmailService, rateService: RateService) {
    const newRate = await rateService.getRate();

    if (newRate === rate) return;

    rate = newRate;
    try {
        await emailService.sendEmails();
    } catch (ignored) {
    }
}