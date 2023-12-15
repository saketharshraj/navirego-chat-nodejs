"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Roles_1 = require("../../../../constants/Roles");
const errors_1 = require("@feathersjs/errors");
const CheckRole = () => (context) => {
    const data = context.data;
    let { role } = data;
    if (typeof role == 'string')
        role = parseInt(role);
    if (![Roles_1.USER].includes(role)) {
        throw new errors_1.BadRequest('Either you are not authorized or the role is not valid');
    }
};
exports.default = CheckRole;
