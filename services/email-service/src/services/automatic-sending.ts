import {EmailService} from "./email-service.js";
import {emailService} from "../di.email.js";
import {RateFetcher} from "./rate-fetcher.js";
import {rootEmail} from "../../../logging-service/src/di.logging.js";

const log = rootEmail.getChildCategory("Automatic Sending");

let rate;
const timeDelay = 1000 * 60 * 10; // 10 min in ms

setInterval(await automaticSending, timeDelay, emailService);

async function automaticSending(emailService: EmailService) {
    try {
        const newRate = await RateFetcher.getRate();

        if (newRate === rate) return;

        rate = newRate;

        await emailService.sendRateToSubscribers();

        log.debug(`Emails with updated (${newRate}) rate were automatically sent`);
    } catch(err) {
        log.error(`Failed to automatically send emails: ${err}`);
    }
}