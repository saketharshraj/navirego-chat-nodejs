"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateMessageCountInChat = async (result, context) => {
    const { app } = context;
    const { chatId } = result;
    const messageService = app.service('v1/message');
    const messagesCount = await messageService
        .find({
        query: {
            chatId,
        },
    })
        .then((res) => {
        return res.total;
    });
    await app.service('v1/chat').patch(chatId, {
        messagesCount,
    });
};
exports.default = UpdateMessageCountInChat;
