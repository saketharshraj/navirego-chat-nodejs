"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication = __importStar(require("@feathersjs/authentication"));
const SetCreatedBy_1 = __importDefault(require("../../../hooks/SetCreatedBy"));
const CheckAndCreateChat_1 = __importDefault(require("./hooks/CheckAndCreateChat"));
const IncludeMessagesCount_1 = __importDefault(require("./hooks/IncludeMessagesCount"));
const SetDefaultItem_1 = __importDefault(require("../../../hooks/SetDefaultItem"));
const Status_1 = require("../../../constants/Status");
const CreateBotMessage_1 = __importDefault(require("./hooks/CreateBotMessage"));
const IncludeBotResponse_1 = __importDefault(require("./hooks/IncludeBotResponse"));
// Don't remove this comment. It's needed to format import lines nicely.
const { authenticate } = authentication.hooks;
exports.default = {
    before: {
        all: [authenticate('jwt')],
        find: [],
        get: [],
        create: [(0, SetDefaultItem_1.default)('status', Status_1.ACTIVE), (0, SetCreatedBy_1.default)(), (0, CheckAndCreateChat_1.default)()],
        update: [],
        patch: [],
        remove: []
    },
    after: {
        all: [],
        find: [],
        get: [],
        create: [(0, CreateBotMessage_1.default)(), (0, IncludeMessagesCount_1.default)(), (0, IncludeBotResponse_1.default)()],
        update: [],
        patch: [],
        remove: []
    },
    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
