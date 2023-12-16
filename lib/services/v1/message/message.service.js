"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_class_1 = require("./message.class");
const message_model_1 = __importDefault(require("./message.model"));
const message_hooks_1 = __importDefault(require("./message.hooks"));
const UpdateMessageCountInChat_1 = __importDefault(require("./events/UpdateMessageCountInChat"));
function default_1(app) {
    const options = {
        Model: (0, message_model_1.default)(app),
        paginate: app.get('paginate')
    };
    // Initialize our service with any options it requires
    app.use('/v1/message', new message_class_1.Message(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('v1/message');
    service.on('created', UpdateMessageCountInChat_1.default);
    service.hooks(message_hooks_1.default);
}
exports.default = default_1;
