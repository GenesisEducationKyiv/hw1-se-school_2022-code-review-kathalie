import express from 'express';
import apiRouter from "./routers/api-router.js";
import { Ports } from "../services/rate-service/src/common/constants/ports.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(Ports.RATE_SERVER_PORT, () => console.log(`SERVER STARTED ON PORT ${Ports.RATE_SERVER_PORT}`));

export { app };