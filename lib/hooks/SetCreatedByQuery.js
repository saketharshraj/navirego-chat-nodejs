"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description set createdBy field in query.
 * @constructor
 * @param _fieldNames
 */
const SetCreatedByQuery = (..._fieldNames) => (context) => {
    const { params } = context;
    const { user, query = {} } = params;
    if (!user)
        return context;
    const fieldNames = _fieldNames.length ? _fieldNames : ['createdBy'];
    if (Array.isArray(fieldNames)) {
        fieldNames.map((each) => (query[each] = user._id));
    }
    return context;
};
exports.default = SetCreatedByQuery;
