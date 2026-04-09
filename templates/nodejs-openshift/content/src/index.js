const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const pinoHttp = require('pino-http');
const logger = require('./logger');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || ${{ values.port }};

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.get('/healthcheck', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', routes);

app.use((err, _req, res, _next) => {
  logger.error(err);
  res.status(err.status || 500).json({
    error: { message: err.message || 'Internal Server Error' },
  });
});

app.listen(PORT, () => {
  logger.info(`${{ values.name }} running on port ${PORT}`);
});

module.exports = app;
