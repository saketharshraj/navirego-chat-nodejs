"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@feathersjs/errors");
const CheckAndCreateChat = () => async (context) => {
    const { app, params } = context;
    const data = context.data;
    let { chatId, message } = data;
    if (!chatId) {
        if (!message || message.length === 0) {
            throw new errors_1.BadRequest('Message is required to create a new chat.');
        }
        // Using 15 characters of the message for the chat title
        const title = message.substring(0, 15);
        // Create a new chat
        const chat = await app.service('v1/chat').create({
            title: title,
        });
        context.data.chatId = chat._id;
    }
};
exports.default = CheckAndCreateChat;
