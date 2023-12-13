import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { MessageRequest } from '../@types/Request';
import { ACTIVE } from '../../../../constants/Status';

const CheckAndCreateChat = () => async (context: HookContext) => {
    const { app, params } = context;
    const data = context.data as MessageRequest;
    let { chatId, message } = data;
    if (!chatId) {
        if (!message || message.length === 0) {
            throw new BadRequest('Message is required to create a new chat.');
        }

        // Using 15 characters of the message for the chat title
        const title = message.substring(0, 15);

        // Create a new chat
        console.log(title)
        const chat = await app.service('v1/chat').create({
            title: title,
        });
        console.log(chat)
        context.data.chatId = chat._id;
    }
};

export default CheckAndCreateChat;

