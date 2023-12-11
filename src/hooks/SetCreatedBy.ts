import { HookContext } from '@feathersjs/feathers';

/**
 * @description set createdBy field in object.
 * @param key
 * @constructor
 */
const SetCreatedBy =
    (key = 'createdBy') =>
    (context: HookContext) => {
        const { user } = context.params;

        if (!user) return context;

        if (Array.isArray(context.data)) {
            context.data.map((each) => {
                each[key] = user._id;
            });
        } else {
            context.data[key] = user._id;
        }
        return context;
    };

export default SetCreatedBy;
