import mongoose from 'mongoose';
import { Application } from './declarations';
import logger from './logger';

export default function (app: Application): void {
    mongoose.set('strictQuery', true);
    mongoose.connect(app.get('mongodb')).catch((err) => {
        logger.error(err);
        process.exit(1);
    });

    app.set('mongooseClient', mongoose);
}
