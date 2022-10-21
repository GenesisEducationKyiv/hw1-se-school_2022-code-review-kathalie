import express from 'express';
import apiRouter from "./routers/api-router.email.js";
import {Ports} from "../../common/constants/ports.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(Ports.EMAIL_SERVER_PORT, () => console.log(`SERVER STARTED ON PORT ${Ports.EMAIL_SERVER_PORT}`));

export { app };