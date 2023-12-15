"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_class_1 = require("./user.class");
const user_model_1 = __importDefault(require("./user.model"));
const user_hooks_1 = __importDefault(require("./user.hooks"));
function default_1(app) {
    const options = {
        Model: (0, user_model_1.default)(app),
        paginate: app.get('paginate'),
        // whitelist: ['$regex', '$options', '$populate'],
    };
    // Initialize our service with any options it requires
    app.use('/v1/user', new user_class_1.User(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('v1/user');
    service.hooks(user_hooks_1.default);
}
exports.default = default_1;
