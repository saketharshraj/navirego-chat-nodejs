import { HookContext } from '@feathersjs/feathers';
import { AllMessages, Message, Messages } from '../@types/MessageResponse';

const UpdateMessageCountInChat = async (
    result: Message,
    context: HookContext,
) => {
    console.log('hello');
    const { app } = context;
    const { message, chatId } = result;
    const messageService = app.service('v1/message');
    const messagesCount = await messageService
        .find({
            query: {
                chatId,
            },
        })
        .then((res: Messages) => {
            return res.total;
        });
    await app.service('v1/chat').patch(chatId, {
        messagesCount,
    });
};

export default UpdateMessageCountInChat;

