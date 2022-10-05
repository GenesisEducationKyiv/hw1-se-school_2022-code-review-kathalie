import * as fs from "fs";
import { FileNames } from "../constants/file-names.js";

export const rateLogger = fs.createWriteStream(FileNames.RATE_LOGGER, {
    flags: 'a',

})