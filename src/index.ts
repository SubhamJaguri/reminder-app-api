import { startRabbitMQ } from './rabbitmq';
import 'dotenv/config';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'colors';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';

import {
  errorHandler,
  notFound,
} from './modules/common/middlewares/error.middleware';
import userRoutes from './modules/user/user.route';
import reminderRoutes from './modules/reminder/reminder.route';

(async () => {
  /* Database */
  await createConnection();

  if (process.env.EVENT_BUS === 'rabbitmq') {
    /* Connect RabbitMQ */
    await startRabbitMQ();
  }

  // app code
  const app = express();
  /* Required middlewares */
  app.use(express.json());
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(cookieParser());

  // Middlewares for development
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  /* Routes */
  app.get('/', (_, res) =>
    res.send('hello from radiusbuy backend on stage server')
  );
  app.use('/user/v1/', userRoutes);
  app.use('/reminder/v1', reminderRoutes);

  /* Custom Middlewares */
  app.use(notFound);
  app.use(errorHandler);

  /* Server */
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
        .bold
    );
  });
})();
