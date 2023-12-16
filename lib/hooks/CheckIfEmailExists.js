"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@feathersjs/errors");
/**
 * @description check if email exists in db or not.
 * @constructor
 */
const CheckIfEmailExists = () => async (context) => {
    const { data, app } = context;
    const { email } = data;
    const userData = await app
        .service('v1/user')
        ._find({
        query: {
            email,
        },
        paginate: false,
    })
        .then((res) => (res.length ? res[0] : null));
    if (!userData) {
        throw new errors_1.FeathersError('Can not find your account. Please register to continue.', 'TooEarly', 425, '', undefined);
    }
    if (userData.status === -1)
        throw new errors_1.BadRequest('Your account has been deleted. Contact admin if this is a mistake.');
    return context;
};
exports.default = CheckIfEmailExists;
