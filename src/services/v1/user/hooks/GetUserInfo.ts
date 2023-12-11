import { HookContext } from '@feathersjs/feathers';

const GetUserInfo = () => async (context: HookContext) => {
    const { app, params } = context;
    const id = params.user?._id;
    const userData = await app.service('v1/user').get(id);
    context.result = userData;
};
export default GetUserInfo;
