"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feathers_hooks_common_1 = require("feathers-hooks-common");
const errors_1 = require("@feathersjs/errors");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const get_1 = __importDefault(require("lodash/get"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const has_1 = __importDefault(require("lodash/has"));
/**
 *
 * @param fieldNames
 * @param message
 * @constructor
 */
const FRequired = (fieldNames, message = '%name% is required') => (context) => {
    (0, feathers_hooks_common_1.checkContext)(context, 'before', ['create', 'update', 'patch'], 'Required');
    const _items = (0, feathers_hooks_common_1.getItems)(context);
    const items = Array.isArray(_items) ? _items : [_items];
    if (!Array.isArray(fieldNames))
        fieldNames = [fieldNames];
    const fields = fieldNames;
    items.forEach((item) => fields.forEach((each) => {
        if (Array.isArray(each)) {
            const [name, nickName] = each;
            const newMessage = message.replace('%name%', nickName);
            if (!(0, has_1.default)(item, name))
                throw new errors_1.BadRequest(newMessage);
            const value = (0, get_1.default)(item, name);
            if (!value && value !== 0 && value !== false)
                throw new errors_1.BadRequest(newMessage);
        }
        else {
            const newMessage = message.replace('%name%', each);
            if (!(0, has_1.default)(item, each))
                throw new errors_1.BadRequest(newMessage);
            const value = (0, get_1.default)(item, each);
            if (!value && value !== 0 && value !== false)
                throw new errors_1.BadRequest(newMessage);
        }
    }));
    return context;
};
exports.default = FRequired;
