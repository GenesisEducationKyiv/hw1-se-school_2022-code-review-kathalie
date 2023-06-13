import {rootCustomer} from "../../../logging-service/src/di.logging.js";
import {Customer} from "../models/customer";

const log = rootCustomer.getChildCategory("Customer Repository");

export interface IFileManager {
    getContent(): string[];

    addLine(line: string): boolean;
}

export class CustomerRepository{
    private fileManager;

    constructor(fileManager: IFileManager) {
        this.fileManager = fileManager;

        log.debug(`Customer Repository instance has been created`);
    }

    getAll(): string[] {
        return this.fileManager.getContent();
    }

    save(customer: Customer): boolean {
        return this.fileManager.addLine(customer.email.address);
    }

    remove(customer: Customer): boolean {
        return this.fileManager.removeLine(customer.email.address);
    }

    isExists(customer: Customer): boolean {
        return this.fileManager.getContent().includes(customer.email.address);
    }
}