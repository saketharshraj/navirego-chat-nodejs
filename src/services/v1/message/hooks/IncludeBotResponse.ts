import { HookContext } from '@feathersjs/feathers';

const IncludeBotResponse = () => async (context: HookContext) => {
    const { result, data } = context;
    result.botResponse = data?.botResponse;
};

export default IncludeBotResponse;

