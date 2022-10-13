import {EmailService} from "./email-service.js";
import {emailService} from "../di.email.js";
import {RateFetcher} from "./rate-fetcher.js";


let rate;
const timeDelay = 1000 * 60 * 10; // 10 min in ms

setInterval(await automaticSending, timeDelay, emailService);

async function automaticSending(emailService: EmailService) {
    try {
        const newRate = await RateFetcher.getRate();

        if (newRate === rate) return;

        rate = newRate;

        await emailService.sendRateToSubscribers();
    } catch(err) {
        console.log(`Emails were not automatically sent: ${err}`);
    }
}