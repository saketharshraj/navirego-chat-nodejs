"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const feathers_hooks_common_1 = require("feathers-hooks-common");
/**
 * @description set default value in data for respected field.
 * @param fieldName
 * @param defaultValue
 * @constructor
 */
const SetDefaultItem = (fieldName, defaultValue) => (context) => {
    const items = (0, feathers_hooks_common_1.getItems)(context);
    if (Array.isArray(items)) {
        items.forEach((item) => {
            if (typeof item[fieldName] === 'undefined')
                item[fieldName] = defaultValue;
        });
    }
    else {
        if (typeof items[fieldName] === 'undefined')
            items[fieldName] = defaultValue;
    }
    (0, feathers_hooks_common_1.replaceItems)(context, items);
    return context;
};
exports.default = SetDefaultItem;
