import {Placeholders} from "./placeholders.js";

export const EnvEmail = {
    SUBJECT: process.env.EMAIL_SUBJECT || 'Поточний курс біткоїна в гривні',
    TEXT: process.env.EMAIL_TEXT || `1 BTC = ${Placeholders.CURRENT_RATE_PLACEHOLDER} UAH`,
    SERVICE: process.env.EMAIL_SERVICE || 'gmail',
    SENDER_EMAIL: process.env.EMAIL_USER_NAME,
    SENDER_PASSWORD: process.env.EMAIL_PASSWORD
}