require('dotenv').config();

const cookieParser = requier('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { dbOptions, dbUrl, port } = require('./utils');
const cors = require('cors');
const middlewaresRouter = require('./middlewares');
const { errorsHandler } = require('./middlewares/errors-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(dbUrl, dbOptions);

app.use(middlewaresRouter);

app.use(cookieParser());

app.use(requestLogger);

app.use(cors({
    origin: [
      'http://localhost:3000',
      'http://www.lomovitsky.ru',
      'https://www.lomovitsky.ru',
      'http://lomovitsky.ru',
      'https://lomovitsky.ru',
    ],
    credentials: true,
  }));

app.use(router);

router.use(errorLogger);

router.use(errors());

router.use(errorsHandler);

app.listen(port);
