"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = require("fs");
dotenv_1.default.config();
const validateEnv = () => {
    if (!process.env.PORT) {
        throw new Error("PORT environment variable is missing");
    }
    if (process.env.SSL_KEY && !(0, fs_1.existsSync)(process.env.SSL_KEY)) {
        throw new Error(`SSL_KEY file does not exist at ${process.env.SSL_KEY}`);
    }
    if (process.env.SSL_CERT && !(0, fs_1.existsSync)(process.env.SSL_CERT)) {
        throw new Error(`SSL_CERT file does not exist at ${process.env.SSL_CERT}`);
    }
};
exports.validateEnv = validateEnv;
