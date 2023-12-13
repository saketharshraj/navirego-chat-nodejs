/**
 * @description interfaces for Message
 */
import { ObjectId } from 'mongoose';

interface Message {
    _id: ObjectId;
    message: string;
    messageType: string;
    fileUrl?: string;
    chatId: ObjectId;
    createdBy: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface Messages {
    total: number;
    skip: number;
    limit: number;
    data: Array<Message>;
}

interface AllMessages extends Array<Message> {}

export { Message, Messages, AllMessages };
