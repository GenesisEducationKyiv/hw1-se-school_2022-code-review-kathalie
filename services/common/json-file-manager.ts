import * as fs from 'fs';

import { IFileManager } from "./repositories/email-repository.js";
import {rootEmail} from "../../../logging-service/src/di.logging.js";

const log = rootEmail.getChildCategory("Json File Manager");

export class JsonFileManager implements IFileManager{
    fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;

        log.debug(`Json File Manager instance has been created`);
    }

    public getContent(): string[] {
        try {
            let fileContent = fs.readFileSync(this.fileName, 'utf-8');

            if (typeof fileContent === 'undefined'){
                fileContent = '';
            }

            log.debug(`Successfully got content from a file ${this.fileName}`);

            return JSON.parse(fileContent);
        } catch(err) {
            log.error(`Failed to get content of the file ${this.fileName}: ${err}`);

            return [];
        }
    }

    private write(content: string[]): boolean {
        const stringifiedSContent = JSON.stringify(content);

        try {
            fs.writeFileSync(this.fileName, stringifiedSContent);

            log.debug(`Successfully written to a file ${this.fileName}`);

            return true;
        } catch(err) {
            log.error(`Failed to write to a file ${this.fileName}: ${err}`);

            return false
        }
    }

    public addLine(line: string): boolean {
        const content = this.getContent();

        content.push(line);

        return this.write(content);
    }

    public removeLine(line: string): boolean {
        const content = this.getContent();

        const updatedContent = content.filter((value) => {
            return value.toString() !== line;
        });

        return this.write(updatedContent);
    }

    public deleteFile(): void {
        try {
            fs.unlinkSync(this.fileName);

            log.debug(`Successfully deleted a file ${this.fileName}`);
        } catch (err) {
            log.debug(`Failed to delete a file ${this.fileName}: ${err}`);
        }
    }
}