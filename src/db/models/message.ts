import { ObjectId } from "mongodb";
import { getMongoClientinstance } from "../config";
import errorHandler from "@/app/api/errorHandler";

export type IMessage = {
  _id?: ObjectId;
  senderId: string;
  senderName?: string;
  receiverName?: string;
  receiverId: string;
  message: string;
  timestamp: Date;
};

const DATABASE_NAME = process.env.DATABASE_NAME as string;
const COLLECTION_NAME = "messages";

export const getDb = async () => {
  const client = await getMongoClientinstance();
  const db = client.db(DATABASE_NAME);
  return db;
};

export const createMessage = async (message: IMessage) => {
  const db = await getDb();

  const findSenderProfile = await db.collection("profile").findOne({
    UserId: new ObjectId(message.senderId),
  });

  const findReceiverProfile = await db.collection("profile").findOne({
    _id: new ObjectId(message.receiverId),
  });

  if (!findSenderProfile || !findReceiverProfile) {
    throw new Error("Failed to send message: profile not found");
  }

  const senderProfile = findSenderProfile;
  const receiverProfile = findReceiverProfile;

  const result = await db.collection(COLLECTION_NAME).insertOne({
    ...message,
    receiverId: new ObjectId(receiverProfile._id),
    senderId: new ObjectId(senderProfile._id),
    senderName: senderProfile.name,
    receiverName: receiverProfile.name,
  });

  if (!result.insertedId) {
    throw new Error("Failed to create message");
  }
  return result;
};

export const getMessages = async (accountId: string, userId2: string) => {
  try {
    const db = await getDb();
    const findUserId1 = await db.collection("profile").findOne({
      UserId: new ObjectId(accountId),
    });

    if (!findUserId1) {
      throw new Error("Profile not found");
    }

    const userId1 = findUserId1._id.toHexString();

    const messages = await db
      .collection(COLLECTION_NAME)
      .find({
        $or: [
          {
            senderId: new ObjectId(userId1),
            receiverId: new ObjectId(userId2),
          },
          {
            senderId: new ObjectId(userId2),
            receiverId: new ObjectId(userId1),
          },
        ],
      })
      .toArray();

    return messages;
  } catch (error) {
    errorHandler(error);
  }
};
