"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description set default value in query for respected field.
 * @param fieldName
 * @param defaultValue
 * @constructor
 */
const SetDefaultQuery = (fieldName, defaultValue) => (context) => {
    const { params } = context;
    const { query = {} } = params;
    if (typeof query[fieldName] === 'undefined')
        query[fieldName] = defaultValue;
    return context;
};
exports.default = SetDefaultQuery;
