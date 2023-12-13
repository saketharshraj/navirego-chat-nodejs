import { Types } from 'mongoose';

interface MessageRequest {
  message: string;
  messageType: string;
  fileUrl?: string;
  chatId?: Types.ObjectId;
}

export { MessageRequest }