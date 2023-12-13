// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { disallow, iff, isNot, isProvider } from 'feathers-hooks-common';
import { USER } from '../../../constants/Roles';
import { ACTIVE } from '../../../constants/Status';
import FRequired from '../../../hooks/FRequired';
import Permit from '../../../hooks/Permit';
import SetDefaultItem from '../../../hooks/SetDefaultItem';
import hasAccessToken from '../../../utils/hasAccessToken';
import CheckEmailOrPhone from './hooks/CheckEmailOrPhone';
import CheckRole from './hooks/CheckRole';
import GetUserInfo from './hooks/GetUserInfo';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
    before: {
        all: [],
        find: [],
        get: [iff(hasAccessToken(), authenticate('jwt'), GetUserInfo()).else(disallow())],
        create: [
            FRequired(['name', 'email', 'password']),
            CheckEmailOrPhone(),
            SetDefaultItem('status', ACTIVE),
            SetDefaultItem('role', USER),
            hashPassword('password'),
        ],
        update: [disallow()],
        patch: [hashPassword('password'), authenticate('jwt')],
        remove: [authenticate('jwt')],
    },

    after: {
        all: [protect('password')],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
};
