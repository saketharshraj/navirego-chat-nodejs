"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("./v1"));
const chat_service_1 = __importDefault(require("./v1/chat/chat.service"));
const message_service_1 = __importDefault(require("./v1/message/message.service"));
const upload_service_1 = __importDefault(require("./v1/upload/upload.service"));
const upload_file_service_1 = __importDefault(require("./v1/upload-file/upload-file.service"));
// Don't remove this comment. It's needed to format import lines nicely.
function default_1(app) {
    app.configure(v1_1.default);
    app.configure(chat_service_1.default);
    app.configure(message_service_1.default);
    app.configure(upload_service_1.default);
    app.configure(upload_file_service_1.default);
}
exports.default = default_1;
