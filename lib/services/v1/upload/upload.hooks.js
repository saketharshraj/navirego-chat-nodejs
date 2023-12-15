"use strict";
// import * as feathersAuthentication from '@feathersjs/authentication';
Object.defineProperty(exports, "__esModule", { value: true });
// const { authenticate } = feathersAuthentication.hooks;
exports.default = {
    before: {
        all: [],
        find: [],
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
