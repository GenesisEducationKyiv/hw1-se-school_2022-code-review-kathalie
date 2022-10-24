import express from 'express';

import {Ports} from "../common/constants/ports.js";
import {rootCustomer} from "../logging-service/src/di.logging.js";

const app = express();
const log = rootCustomer.getChildCategory("App");

app.listen(Ports.CUSTOMER_SERVER_PORT, () => log.info(`SERVER STARTED ON PORT ${Ports.CUSTOMER_SERVER_PORT}`));

export { app };