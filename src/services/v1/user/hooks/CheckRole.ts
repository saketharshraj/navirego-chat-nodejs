import { HookContext } from '@feathersjs/feathers';
import { User } from '../@types/User';
import { USER } from '../../../../constants/Roles';
import { BadRequest } from '@feathersjs/errors';

const CheckRole = () => (context: HookContext) => {
    const data = context.data as User;
    let { role } = data;
    if (typeof role == 'string') role = parseInt(role);
    if (![USER].includes(role)) {
        throw new BadRequest('Either you are not authorized or the role is not valid');
    }
};

export default CheckRole;
