import express from 'express';
import apiRouter from "./routers/api-router.js";
import { Ports } from "./common/constants/ports.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(Ports.MAIN_PORT, () => console.log(`SERVER STARTED ON PORT ${Ports.MAIN_PORT}`));

export { app };