import { Application } from '../../../declarations';
import { Model, Mongoose } from 'mongoose';
import { USER, BOT } from '../../../constants/Roles';
import { ACTIVE, DELETED } from '../../../constants/Status';

export default function (app: Application): Model<any> {
    const modelName = 'user';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
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
                enum: [ACTIVE, DELETED],
            },
            role: {
                type: Number,
                enum: [USER, BOT],
                required: true,
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
