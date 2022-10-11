import * as fs from "fs";
import { FileNames } from "../../common/constants/file-names.js";

export const rateLogger = fs.createWriteStream(FileNames.RATE_LOGGER, {
    flags: 'a',

})