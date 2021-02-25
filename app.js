require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { PORT, DATABASE } = require('./config');
const limiter = require('./middlewares/ratelimiter');

const app = express();

mongoose.connect(`mongodb://localhost:27017/${DATABASE}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://lomovitsky.ru',
    'https://lomovitsky.ru',
    'http://www.lomovitsky.ru',
    'https://www.lomovitsky.ru',
  ],
  credentials: true,
}));
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
