import express, { json, urlencoded } from 'express';
import router from './controllers/v1.controller.js';
import logger from './logger/winston.js';

const app = express();

app.use('/v1', router)
app.post('/signin', (req, res) => {
    logger.info('Sign in route called');
    res.json({ message: 'Sign in route called' });

})
app.use(json())
app.use(urlencoded({ extended: true }));

const port = 8080;

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});