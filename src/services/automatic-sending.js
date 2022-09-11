import * as rateService from "./api/rate-service.js";
import {sendEmails} from "./api/email-service.js";

let rate;
const timeDelay = 1000 * 60 * 10; // 10 min

setInterval(await automaticSending, timeDelay);

async function automaticSending() {
    const newRate = await rateService.getRate();

    if (newRate === rate) return;

    rate = newRate;
    try {
        await sendEmails();
    } catch (ignored) {
    }
}