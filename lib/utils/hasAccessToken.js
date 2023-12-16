"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @return {function(*): boolean}
 * @constructor
 */
const hasAccessToken = () => (context) => {
    const { params } = context;
    const { authentication } = params;
    return authentication !== undefined;
};
exports.default = hasAccessToken;
