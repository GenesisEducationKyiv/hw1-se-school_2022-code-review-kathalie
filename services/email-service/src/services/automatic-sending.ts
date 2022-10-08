import {EmailService} from "./email-service.js";
import {RateService} from "../../../rate-service/src/services/rate-service.js";
import {emailService, rateService} from "../app-config.js";

let rate;
const timeDelay = 1000 * 60 * 10; // 10 min in ms

setInterval(await automaticSending, timeDelay, emailService, rateService);

async function automaticSending(emailService: EmailService, rateService: RateService) {
    const newRate = await rateService.getRate();

    if (newRate === rate) return;

    rate = newRate;
    try {
        await emailService.sendRateToSubscribers();
    } catch (ignored) {
    }
}