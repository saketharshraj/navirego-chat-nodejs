"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
const mongo_1 = require("./configs/mongo");
function default_1(app) {
    mongoose_1.default.set('strictQuery', true);
    mongoose_1.default.connect(mongo_1.mongoConfig.URL).catch((err) => {
        logger_1.default.error(err);
        process.exit(1);
    });
    app.set('mongooseClient', mongoose_1.default);
}
exports.default = default_1;
