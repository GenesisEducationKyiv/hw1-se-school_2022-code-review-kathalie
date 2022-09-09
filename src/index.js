import express from 'express';
import router from "./router.js";
import { PORT } from "./constants/ports.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use('/api', router);

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));

global.mockingFetch = false;

export { app };