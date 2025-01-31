"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const winston_1 = __importDefault(require("winston"));
// General error handler
const errorHandler = (err, req, res, next) => {
    winston_1.default.error(`Error: ${err.message}`);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
    });
};
exports.errorHandler = errorHandler;
