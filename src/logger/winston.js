import { createLogger, format as _format, transports as _transports } from 'winston';

// Create a new logger instance
const logger = createLogger({
    level: 'info', // Set the log level
    format: _format.combine(
        _format.timestamp(), // Add timestamp to logs
        _format.json(), // Use JSON format for logs
        _format.prettyPrint()
    ),
    transports: [
        new _transports.Console(), // Log to console
        new _transports.File({ filename: 'logs.log' }) // Log to a file
    ]
});

export default logger;