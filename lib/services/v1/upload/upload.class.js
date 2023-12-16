"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = void 0;
/* eslint-disable no-unused-vars */
const Upload = class Upload {
    constructor(options) {
        this.options = options || {};
    }
    async create(data, params) {
        if (Array.isArray(data)) {
            return Promise.all(data.map((current) => this.create(current, params)));
        }
        // console.log(data);
        return data;
    }
};
exports.Upload = Upload;
