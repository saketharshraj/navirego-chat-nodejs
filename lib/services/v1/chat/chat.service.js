"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_class_1 = require("./chat.class");
const chat_model_1 = __importDefault(require("./chat.model"));
const chat_hooks_1 = __importDefault(require("./chat.hooks"));
function default_1(app) {
    const options = {
        Model: (0, chat_model_1.default)(app),
        paginate: app.get('paginate')
    };
    // Initialize our service with any options it requires
    app.use('/v1/chat', new chat_class_1.Chat(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('v1/chat');
    service.hooks(chat_hooks_1.default);
}
exports.default = default_1;
