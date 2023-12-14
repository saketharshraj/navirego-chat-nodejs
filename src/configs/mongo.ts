import 'dotenv/config';

export const mongoConfig = {
    URL: process.env.MONGO || 'mongodb://127.0.0.1:27017/navirego_chat',
};
