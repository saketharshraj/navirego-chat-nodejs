import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { MessageRequest } from '../@types/Request';
import { ACTIVE } from '../../../../constants/Status';
import { TEXT } from '../../../../constants/Message';
import { botConfig } from '../../../../configs/bot';

const IncludeMessagesCount = () => async (context: HookContext) => {
    const { result, app } = context;
    const chatId = result.chatId;
    console.log("dta", context.data)
    console.log("result", result)
    const messagesCount = await app
        .service('v1/message')
        .find({
            query: {
                chatId,
                status: ACTIVE,
            },
        })
        .then((res: any) => res.total);
    result.messagesCount = messagesCount;
};

export default IncludeMessagesCount;

