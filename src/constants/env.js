import {Placeholders} from "./placeholders.js";

export const Env = {
    subject: process.env.EMAIL_SUBJECT || 'Поточний курс біткоїна в гривні',
    text: process.env.EMAIL_TEXT || `1 BTC = ${Placeholders.currentRatePlaceholder} UAH`,
    service: process.env.EMAIL_SERVICE || 'gmail',
    senderEmail: process.env.EMAIL_USER_NAME,
    senderPassword: process.env.EMAIL_PASSWORD
}