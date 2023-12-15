"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const feathers_mongoose_1 = require("feathers-mongoose");
class User extends feathers_mongoose_1.Service {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(options, app) {
        super(options);
    }
}
exports.User = User;
