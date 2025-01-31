#!/usr/bin/env node

import https from "https";
import http from "http";
import path from "path";
import fs from "fs";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { validateEnv } from "./config/serverConfig";
import winston from "winston";

validateEnv();

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

const { SSL_KEY, SSL_CERT, PORT } = process.env;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PATCH",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

const stockData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'var', 'data.json'), 'utf-8')
);
app.get('/stock-exchanges', (req, res) => {
  const exchanges = stockData.map((exchange) => ({
    code: exchange.code,
    name: exchange.stockExchange
  }));
  res.json(exchanges);
});

app.get('/stocks/:exchangeCode', (req, res) => {
  const exchange = stockData.find((ex) => ex.code === req.params.exchangeCode);
  if (!exchange) {
    return res.status(404).json({ error: 'Exchange not found' });
  }
  res.json(exchange.topStocks);
});

app.get('/stock-price/:stockCode', (req, res) => {
  const allStocks = stockData.flatMap((exchange) => exchange.topStocks);
  const stock = allStocks.find((stk) => stk.code === req.params.stockCode);
  if (!stock) {
    return res.status(404).json({ error: 'Stock not found' });
  }
  res.json({ code: stock.code, name: stock.stockName, price: stock.price });
});

app.use(errorHandler);

const ssl = fs.existsSync(SSL_KEY) && fs.existsSync(SSL_CERT);
const server = ssl
  ? https.createServer(
    {
      key: fs.readFileSync(SSL_KEY),
      cert: fs.readFileSync(SSL_CERT),
    },
    app
  )
  : http.createServer(app);

server.listen(PORT, async () => {
  try {
  } catch (error) {
    logger.error("Error:", error);
    process.exit(1);
  }

  logger.info(`Server is running at: http${ssl ? "s" : ""}://localhost:${PORT}`);
});
