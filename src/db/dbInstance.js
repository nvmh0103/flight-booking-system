import { Sequelize } from 'sequelize';
import logger from '../logger/winston.js';

class dbInstance {
    sequelize;
    constructor() {}

    async connect() {
        try {
            const sequelize = this.getConnection();
            await sequelize.authenticate();
            logger.info('Connection has been established successfully.');
        } catch (error) {
            logger.error('Unable to connect to the database:', error);
        }
    }

    getConnection() {
        if (this.sequelize) {
            return this.sequelize;
        } else {
            this.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
                host: process.env.DB_HOST,
                dialect: 'postgres',
            });
            return this.sequelize;
        }
    }

    async disconnect() {
        try {
            await this.sequelize.close();
            logger.info('Connection has been closed successfully.');
        } catch (error) {
            logger.error('Unable to close the database connection:', error);
        }
    }
}

export default new dbInstance();