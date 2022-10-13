import express from 'express';
import apiRouter from "./src/routers/api-router.rate.js";
import {Ports} from "../common/constants/ports.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(Ports.RATE_SERVER_PORT, () => console.log(`SERVER STARTED ON PORT ${Ports.RATE_SERVER_PORT}`));

export { app };