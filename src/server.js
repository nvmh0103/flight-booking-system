import 'dotenv/config.js';

import express, { json, urlencoded } from 'express';
import router from './controllers/v1.controller.js';
import logger from './logger/winston.js';

import dbInstance from './db/dbInstance.js';


const app = express();

await dbInstance.connect();

app.use('/v1', router);

app.use(json())
app.use(urlencoded({ extended: true }));

const port = 8080;

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});