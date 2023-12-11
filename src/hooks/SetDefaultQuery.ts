import { HookContext } from '@feathersjs/feathers';

/**
 * @description set default value in query for respected field.
 * @param fieldName
 * @param defaultValue
 * @constructor
 */
const SetDefaultQuery =
    (fieldName: string, defaultValue: any) => (context: HookContext) => {
        const { params } = context;
        const { query = {} } = params;

        if (typeof query[fieldName] === 'undefined')
            query[fieldName] = defaultValue;

        return context;
    };

export default SetDefaultQuery;
