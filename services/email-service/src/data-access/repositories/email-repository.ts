import { IEmailRepository } from "../../services/email-service.js";
import {Email} from "../../models/email.js";
import {rootEmail} from "../../../../logging-service/src/di.logging.js";

const log = rootEmail.getChildCategory("Email Repository");

export interface IFileManager {
    getContent(): string[];

    addLine(line: string): boolean;
}

export class EmailRepository implements IEmailRepository{
    private fileManager;

    constructor(fileManager: IFileManager) {
        this.fileManager = fileManager;

        log.debug(`Email Repository instance has been created`);
    }

    getAll(): string[] {
        return this.fileManager.getContent();
    }

    save(email: Email): boolean {
        return this.fileManager.addLine(email.address);
    }

    isExists(email: Email): boolean {
        return this.fileManager.getContent().includes(email.address);
    }
}