import * as fs from "fs";
import { FileNamesEmail } from "../../../email-service/src/common/constants/file-names.email.js";

export const rateLogger = fs.createWriteStream(FileNamesEmail.RATE_LOGGER, {
    flags: 'a',
})