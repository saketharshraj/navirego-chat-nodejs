"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// v1/chat-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const Status_1 = require("../../../constants/Status");
function default_1(app) {
    const modelName = 'chat';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema({
        title: {
            type: String,
            required: true,
        },
        messagesCount: {
            type: Number,
            required: true,
            default: 0,
        },
        createdBy: {
            type: ObjectId,
            ref: 'user',
        },
        status: {
            type: Number,
            enum: [Status_1.ACTIVE, Status_1.DELETED],
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
