#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewares/errorHandler");
const serverConfig_1 = require("./config/serverConfig");
const winston_1 = __importDefault(require("winston"));
(0, serverConfig_1.validateEnv)();
const logger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.simple(),
        }),
    ],
});
const { SSL_KEY, SSL_CERT, PORT } = process.env;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: "GET,POST,PATCH",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}));
const stockData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'var', 'data.json'), 'utf-8'));
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
app.use(errorHandler_1.errorHandler);
const ssl = fs_1.default.existsSync(SSL_KEY) && fs_1.default.existsSync(SSL_CERT);
const server = ssl
    ? https_1.default.createServer({
        key: fs_1.default.readFileSync(SSL_KEY),
        cert: fs_1.default.readFileSync(SSL_CERT),
    }, app)
    : http_1.default.createServer(app);
server.listen(PORT, async () => {
    try {
    }
    catch (error) {
        logger.error("Error:", error);
        process.exit(1);
    }
    logger.info(`Server is running at: http${ssl ? "s" : ""}://localhost:${PORT}`);
});
