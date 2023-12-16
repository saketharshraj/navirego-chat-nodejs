"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Status_1 = require("../../../../constants/Status");
const IncludeMessagesCount = () => async (context) => {
    const { result, app } = context;
    const chatId = result.chatId;
    const messagesCount = await app
        .service('v1/message')
        .find({
        query: {
            chatId,
            status: Status_1.ACTIVE,
        },
    })
        .then((res) => res.total);
    result.messagesCount = messagesCount;
};
exports.default = IncludeMessagesCount;
