"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("@feathersjs/authentication");
const authentication_local_1 = require("@feathersjs/authentication-local");
const authentication_oauth_1 = require("@feathersjs/authentication-oauth");
const CheckIfEmailExists_1 = __importDefault(require("./hooks/CheckIfEmailExists"));
function default_1(app) {
    const authentication = new authentication_1.AuthenticationService(app);
    authentication.register('jwt', new authentication_1.JWTStrategy());
    authentication.register('local', new authentication_local_1.LocalStrategy());
    app.use('/authentication', authentication);
    const service = app.service('authentication');
    service.hooks({
        before: {
            create: [(0, CheckIfEmailExists_1.default)()],
        },
        after: {
            create: [],
        },
    });
    app.configure((0, authentication_oauth_1.expressOauth)());
}
exports.default = default_1;
