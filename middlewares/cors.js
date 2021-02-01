const router = require('express').Router();
const cors = require('cors');

const corsOptions = {
  origin: ['https://shiny-lodge.github.io', 'http://localhost:8080'],
  optionsSuccessStatus: 200,
  credentials: true,
};

router.use(cors(corsOptions));

module.exports = router;
