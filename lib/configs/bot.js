"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botConfig = void 0;
require("dotenv/config");
const mongoose_1 = require("mongoose");
exports.botConfig = {
    botId: new mongoose_1.Types.ObjectId(process.env.BOT_ID),
};
