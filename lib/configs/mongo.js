"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConfig = void 0;
require("dotenv/config");
exports.mongoConfig = {
    URL: process.env.MONGO || "",
};
