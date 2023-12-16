"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsConfig = void 0;
require("dotenv/config");
exports.awsConfig = {
    "accessKeyId": process.env.AccessKeyId,
    "secretAccessKey": process.env.SecretAccessKey,
    "region": process.env.Region,
};
