import 'dotenv/config';
import { Types } from 'mongoose';

export const botConfig = {
  botId: new Types.ObjectId(process.env.BOT_ID),
}
