"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debugHook = () => (context) => {
    const { params, data } = context;
    console.log('params', params);
    console.log('data', data);
};
exports.default = debugHook;
