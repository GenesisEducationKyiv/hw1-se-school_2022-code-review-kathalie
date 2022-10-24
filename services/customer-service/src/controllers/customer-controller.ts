import {Email} from "../../../email-service/src/models/email.js";
import {CustomerRepository} from "../repository/customer-repository.js";
import {Customer} from "../models/customer.js";

export class CustomerController {
    repository: CustomerRepository;

    constructor(repository: CustomerRepository) {
        this.repository = repository;
    }

    createCustomer(email: Email): boolean {
        return this.repository.save(new Customer(email));
    }

    removeCustomer(email: Email) {
        return this.repository.remove(new Customer(email));
    }
}