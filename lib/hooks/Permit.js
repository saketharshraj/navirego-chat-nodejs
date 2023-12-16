"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@feathersjs/errors");
const Roles_1 = require("../constants/Roles");
/**
 * @description check permission for the user.
 * @param roles {"user"|"bot"}
 * @constructor
 */
const Permit = (...roles) => (context) => {
    const { params } = context;
    if (typeof params.provider === 'undefined')
        return context;
    if (!roles.length)
        return context;
    const { user } = params;
    if (!user)
        return context;
    const { role } = user;
    if (roles.indexOf(role) < 0)
        throw new errors_1.Forbidden('You are not allowed to perform this action!');
    return context;
};
Permit.is =
    (...roles) => async (context) => {
        const { params: { user }, } = context;
        if (!user)
            throw new errors_1.NotAuthenticated();
        const { role } = user;
        return roles.some((each) => each === role);
    };
Permit.USER = Permit(Roles_1.USER);
Permit.BOT = Permit(Roles_1.BOT);
exports.default = Permit;
