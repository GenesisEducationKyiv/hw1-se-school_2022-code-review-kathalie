import * as fs from "fs";
import {FileNamesRate} from "../common/constants/file-names.rate.js";

export const rateLogger = fs.createWriteStream(FileNamesRate.RATE_LOGGER, {
    flags: 'a',
})