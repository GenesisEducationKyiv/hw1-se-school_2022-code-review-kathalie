import { IEmailRepository } from "../services/api/email-service.js";
import {Email} from "../models/email.js";

export interface IFileManager {
    getContent(): string[];

    addLine(line: string): boolean;
}

export class EmailRepository implements IEmailRepository{
    private fileManager;

    constructor(fileManager: IFileManager) {
        this.fileManager = fileManager;
    }

    getAll(): string[] {
        return this.fileManager.getContent();
    }

    save(email: Email) {
        this.fileManager.addLine(email.address);
    }

    isExists(email: Email): boolean {
        return this.fileManager.getContent().includes(email.address);
    }
}