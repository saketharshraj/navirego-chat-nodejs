import mongoose from 'mongoose';
import { Application } from './declarations';
import logger from './logger';
import { mongoConfig } from './configs/mongo';

export default function (app: Application): void {
    mongoose.set('strictQuery', true);
    mongoose.connect(mongoConfig.URL).catch((err) => {
        logger.error(err);
        process.exit(1);
    });

    app.set('mongooseClient', mongoose);
}
