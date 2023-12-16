import 'dotenv/config';

export const mongoConfig = {
    URL: process.env.MONGO || "",
};
