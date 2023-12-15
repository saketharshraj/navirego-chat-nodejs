"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param name
 * @param values
 */
const hasData = (name, ...values) => (context) => {
    const { data } = context;
    const value = data[name];
    return values.indexOf(value) >= 0;
};
exports.default = hasData;
