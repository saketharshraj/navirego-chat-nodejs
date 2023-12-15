"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConfig = void 0;
require("dotenv/config");
exports.mongoConfig = {
    URL: process.env.MONGO || 'mongodb://127.0.0.1:27017/navirego_chat',
};
