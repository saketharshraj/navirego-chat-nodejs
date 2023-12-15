"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Status_1 = require("../../../../constants/Status");
const Message_1 = require("../../../../constants/Message");
const bot_1 = require("../../../../configs/bot");
const CreateBotMessage = () => async (context) => {
    const { app, params } = context;
    const data = context.data;
    let { chatId, createdBy } = data;
    const { botId } = bot_1.botConfig;
    if (botId != createdBy) {
        const chat = await app.service('v1/message')._create({
            message: 'I received your message',
            messageType: Message_1.TEXT,
            chatId,
            status: Status_1.ACTIVE,
            createdBy: bot_1.botConfig.botId,
        });
        context.data.botResponse = chat;
    }
    return context;
};
exports.default = CreateBotMessage;
