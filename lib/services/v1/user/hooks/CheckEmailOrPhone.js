"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@feathersjs/errors");
/**
 * @description check if email exists in system or not.
 * @constructor
 */
const CheckEmailOrPhone = () => async (context) => {
    const { data, app, id } = context;
    const userEmail = data.email;
    const userPhone = data.phone;
    const service = app.service('v1/user');
    const userId = id || null;
    if (userEmail) {
        if (userEmail.toString().trim() === '')
            throw new errors_1.BadRequest('Invalid Email ID.');
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail)) {
            throw new errors_1.BadRequest('Please provide a valid email!');
        }
        let query = {
            email: userEmail,
            status: { $ne: -1 },
            id: { $ne: userId },
        };
        if (id) {
            query = {
                ...query,
                id: { $ne: userId },
            };
        }
        const userData = await service
            ._find({
            query,
        })
            .then((res) => (res.total === 1 ? res.data : null));
        // console.log(userData);
        if (userData)
            throw new errors_1.BadRequest('Email value already exists.');
    }
    if (userPhone) {
        if (userPhone.toString().trim() === '')
            throw new errors_1.BadRequest('Invalid Phone Number.');
        if (!/^(([0-9 +_\-,.^*?$^#()])|(ext|x)){1,20}$/.test(userPhone)) {
            throw new errors_1.BadRequest('Please provide a valid phone number!');
        }
        let query = {
            phone: userPhone,
            status: { $ne: -1 },
            id: { $ne: userId },
        };
        if (id) {
            query = {
                ...query,
                id: { $ne: userId },
            };
        }
        const userData = await service
            ._find({
            query,
        })
            .then((res) => (res.total === 1 ? res.data : null));
        // console.log(userData);
        if (userData)
            throw new errors_1.BadRequest('Phone number already exists.');
    }
    return context;
};
exports.default = CheckEmailOrPhone;
