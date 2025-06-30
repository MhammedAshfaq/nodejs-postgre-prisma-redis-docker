import expressWinston from 'express-winston';
import winston from 'winston';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  meta: false,
  msg: (req, res) =>
    `→ ${req.method} ${req.originalUrl} | IP: ${req.ip} | Body: ${JSON.stringify(req.body)} | Query: ${JSON.stringify(req.query)}`,
  expressFormat: false,
  colorize: true,
});
