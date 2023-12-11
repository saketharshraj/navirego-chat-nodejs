import { HookContext } from '@feathersjs/feathers';

const debugHook = () => (context: HookContext) => {
    const { params, data } = context;
    console.log('params', params);
    console.log('data', data);
};

export default debugHook;
