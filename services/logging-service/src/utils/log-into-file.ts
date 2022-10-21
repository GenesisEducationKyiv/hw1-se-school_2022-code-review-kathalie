import * as fs from "fs";

export class LoggerIntoFile {
    logger;

    constructor(fileName: string) {
        this.logger = fs.createWriteStream(fileName, {
            flags: 'a',
        })
    }

    log(line: string) {
        this.logger.write(`${line}\n`);
    }
}


