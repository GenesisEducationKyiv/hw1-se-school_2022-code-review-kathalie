import {CustomerRepository} from "./repository/customer-repository.js";
import {JsonFileManager} from "../../common/json-file-manager.js";
import {CustomerController} from "./controllers/customer-controller.js";
import {FileNamesCustomer} from "./constants/file-names.customer.js";

export const customerRepository = new CustomerRepository(new JsonFileManager(FileNamesCustomer.CUSTOMERS));
export const customerController = new CustomerController(customerRepository);