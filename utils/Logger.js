const { createLogger, format, transports } = require('winston');
const path = require('path');

// Define log format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(
    ({ timestamp, level, message }) => `[${timestamp}] ${process.env.NODE_ENV}.${level.toUpperCase()}: ${message}`
  )
);

// Create the logger
const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [new transports.File({ filename: path.join(__dirname, '../logs/express.log') })],
  exceptionHandlers: [new transports.File({ filename: path.join(__dirname, '../logs/express.log') })],
});

module.exports = logger;
