"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// v1/message-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const Message_1 = require("../../../constants/Message");
const Status_1 = require("../../../constants/Status");
function default_1(app) {
    const modelName = 'message';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema({
        message: {
            type: String,
        },
        messageType: {
            type: Number,
            required: true,
            enum: [Message_1.TEXT, Message_1.BLOB, Message_1.TEXTBLOB],
        },
        fileUrl: {
            type: String,
            required: false,
        },
        chatId: {
            type: ObjectId,
            required: true,
            ref: 'chat',
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
