"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// import aws from './configs/aws';
const aws_1 = require("./configs/aws");
function default_1(app) {
    aws_sdk_1.default.config.update(aws_1.awsConfig);
    const s3 = new aws_sdk_1.default.S3({ apiVersion: '2006-03-01' });
    app.set('s3', s3);
}
exports.default = default_1;
