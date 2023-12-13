// v1/chat-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { ACTIVE, DELETED } from '../../../constants/Status';
import { Application } from '../../../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
    const modelName = 'chat';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            title: {
                type: String,
                required: true,
            },
            chatCount: {
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

