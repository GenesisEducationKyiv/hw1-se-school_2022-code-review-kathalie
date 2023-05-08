import express from 'express';

import apiRouter from "./src/routers/api-router.rate.js";
import {Ports} from "../common/constants/ports.js";
import {rootRate} from "../logging-service/src/di.logging.js";

const app = express();

const log = rootRate.getChildCategory("App");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(Ports.RATE_SERVER_PORT, () => log.info(`SERVER STARTED ON PORT ${Ports.RATE_SERVER_PORT}`));

export { app };
