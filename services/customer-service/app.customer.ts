import express from 'express';

import apiRouter from "./src/routers/api-router.email.js";
import {Ports} from "../common/constants/ports.js";
import {rootEmail} from "../logging-service/src/di.logging.js";

const app = express();
const log = rootEmail.getChildCategory("App");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(Ports.EMAIL_SERVER_PORT, () => log.info(`SERVER STARTED ON PORT ${Ports.EMAIL_SERVER_PORT}`));

export { app };