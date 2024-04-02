import 'dotenv/config.js';

import express from 'express';
import router from './controllers/v1.controller.js';
import logger from './logger/winston.js';

import dbInstance from './db/dbInstance.js';


const app = express();

await dbInstance.connect();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/v1', router);


const port = 8080;

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});