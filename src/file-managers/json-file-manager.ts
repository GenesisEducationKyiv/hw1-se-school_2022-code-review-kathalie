import * as fs from 'fs';

import { IFileManager } from "../repositories/email-repository.js";

export class JsonFileManager implements IFileManager{
    fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    public getContent(): string[] {
        try {
            let fileContent = fs.readFileSync(this.fileName, 'utf-8');

            if (typeof fileContent === 'undefined'){
                fileContent = '';
            }

            return JSON.parse(fileContent);
        } catch(err) {

            return [];
        }
    }

    private write(content: string[]): boolean {
        const stringifiedSContent = JSON.stringify(content);

        try {
            fs.writeFileSync(this.fileName, stringifiedSContent);

            return true;
        } catch(err) {
            console.log(`Failed to save subscription to a file ${this.fileName}. ${err}`);

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
        } catch (err) {
            console.log(`Failed to delete file. ${err}`)
        }
    }
}