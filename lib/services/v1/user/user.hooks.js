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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const feathersAuthentication = __importStar(require("@feathersjs/authentication"));
const local = __importStar(require("@feathersjs/authentication-local"));
const feathers_hooks_common_1 = require("feathers-hooks-common");
const Roles_1 = require("../../../constants/Roles");
const Status_1 = require("../../../constants/Status");
const FRequired_1 = __importDefault(require("../../../hooks/FRequired"));
const SetDefaultItem_1 = __importDefault(require("../../../hooks/SetDefaultItem"));
const hasAccessToken_1 = __importDefault(require("../../../utils/hasAccessToken"));
const CheckEmailOrPhone_1 = __importDefault(require("./hooks/CheckEmailOrPhone"));
const GetUserInfo_1 = __importDefault(require("./hooks/GetUserInfo"));
// Don't remove this comment. It's needed to format import lines nicely.
const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;
exports.default = {
    before: {
        all: [],
        find: [],
        get: [(0, feathers_hooks_common_1.iff)((0, hasAccessToken_1.default)(), authenticate('jwt'), (0, GetUserInfo_1.default)())],
        create: [
            (0, FRequired_1.default)(['name', 'email', 'password']),
            (0, CheckEmailOrPhone_1.default)(),
            (0, SetDefaultItem_1.default)('status', Status_1.ACTIVE),
            (0, SetDefaultItem_1.default)('role', Roles_1.USER),
            hashPassword('password'),
        ],
        update: [(0, feathers_hooks_common_1.disallow)()],
        patch: [hashPassword('password'), authenticate('jwt')],
        remove: [authenticate('jwt')],
    },
    after: {
        all: [protect('password')],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
};
