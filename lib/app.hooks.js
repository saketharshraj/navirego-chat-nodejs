"use strict";
// Application hooks that run for every service
// Don't remove this comment. It's needed to format import lines nicely.
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
const feathers_hooks_common_1 = require("feathers-hooks-common");
const hasAccessToken_1 = __importDefault(require("./utils/hasAccessToken"));
const authentication = __importStar(require("@feathersjs/authentication"));
const { authenticate } = authentication.hooks;
exports.default = {
    before: {
        all: [(0, feathers_hooks_common_1.iff)((0, hasAccessToken_1.default)(), authenticate('jwt'))],
        find: [
            (0, feathers_hooks_common_1.iff)((0, feathers_hooks_common_1.isProvider)('external'), (ctx) => {
                var _a;
                const { params } = ctx;
                const { query } = params;
                let $limit = null;
                $limit = query === null || query === void 0 ? void 0 : query.$limit;
                if ($limit && typeof $limit === 'string')
                    $limit = parseInt($limit);
                if ($limit === -1) {
                    (_a = ctx.params.query) === null || _a === void 0 ? true : delete _a.$limit;
                    ctx.params.paginate = false;
                }
            }),
        ],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
    after: {
        all: [],
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
