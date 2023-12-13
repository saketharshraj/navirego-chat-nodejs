// v1/message-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { BLOB, TEXT } from '../../../constants/Message';
import { ACTIVE, DELETED } from '../../../constants/Status';
import { Application } from '../../../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
    const modelName = 'message';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            message: {
                type: String,
                required: true,
            },
            messageType: {
                type: Number,
                required: true,
                enum: [TEXT, BLOB],
            },
            fileUrl: {
                type: String,
                required: false,
            },
            chatId: {
                type: ObjectId,
                ref: 'chat',
            },
            createdBy: {
                type: ObjectId,
                ref: 'user',
            },
            status: {
                type: Number,
                enum: [ACTIVE, DELETED],
            },
        },
        {
            timestamps: true,
        },
    );

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        (mongooseClient as any).deleteModel(modelName);
    }
    return mongooseClient.model<any>(modelName, schema);
}

