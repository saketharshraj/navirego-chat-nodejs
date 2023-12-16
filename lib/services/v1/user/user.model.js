"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Roles_1 = require("../../../constants/Roles");
const Status_1 = require("../../../constants/Status");
function default_1(app) {
    const modelName = 'user';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: Number,
            default: 1,
            enum: [Status_1.ACTIVE, Status_1.DELETED],
        },
        role: {
            type: Number,
            enum: [Roles_1.USER, Roles_1.BOT],
            required: true,
        },
    }, {
        timestamps: true,
    });
    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);
}
exports.default = default_1;
