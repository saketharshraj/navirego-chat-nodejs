import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { MessageRequest } from '../@types/Request';
import { ACTIVE } from '../../../../constants/Status';
import { TEXT } from '../../../../constants/Message';
import { botConfig } from '../../../../configs/bot';

const CreateBotMessage = () => async (context: HookContext) => {
    const { app, params } = context;
    const data = context.data as MessageRequest;
    let { chatId, createdBy } = data;
    const { botId } = botConfig;
    if (botId != createdBy) {
        const chat = await app.service('v1/message')._create({
            message: 'I received your message',
            messageType: TEXT,
            chatId,
            status: ACTIVE,
            createdBy: botConfig.botId,
        });
        context.data.botResponse = chat;
    }
    return context;
};

export default CreateBotMessage;

