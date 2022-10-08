import express from 'express';
import apiRouter from "./routers/api-router.email.js";
import {PortsEmail} from "./common/constants/ports.email.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(PortsEmail.EMAIL_SERVER_PORT, () => console.log(`SERVER STARTED ON PORT ${PortsEmail.EMAIL_SERVER_PORT}`));

export { app };