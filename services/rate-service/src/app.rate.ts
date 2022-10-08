import express from 'express';
import apiRouter from "./routers/api-router.rate.js";
import {PortsRate} from "./common/constants/ports.rate.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(PortsRate.RATE_SERVER_PORT, () => console.log(`SERVER STARTED ON PORT ${PortsRate.RATE_SERVER_PORT}`));

export { app };