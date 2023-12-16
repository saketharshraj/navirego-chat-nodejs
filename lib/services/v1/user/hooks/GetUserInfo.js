"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetUserInfo = () => async (context) => {
    var _a;
    const { app, params } = context;
    const id = (_a = params.user) === null || _a === void 0 ? void 0 : _a._id;
    const userData = await app.service('v1/user').get(id);
    context.result = userData;
};
exports.default = GetUserInfo;
