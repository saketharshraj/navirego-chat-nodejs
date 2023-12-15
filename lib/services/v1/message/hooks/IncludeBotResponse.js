"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IncludeBotResponse = () => async (context) => {
    const { result, data } = context;
    result.botResponse = data === null || data === void 0 ? void 0 : data.botResponse;
};
exports.default = IncludeBotResponse;
