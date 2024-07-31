import { ProfileModel } from "../../app/api/typeDef";
import { getMongoClientinstance } from "../config";
import errorHandler from "../../app/api/errorHandler";
import { ObjectId } from "mongodb";

export type createProfile = Omit<ProfileModel, "_id">;

const DATABASE_NAME = process.env.DATABASE_NAME;
const collectionNameProfile = "profile";

export const getDb = async () => {
  const client = await getMongoClientinstance();
  const db = client.db(DATABASE_NAME);
  return db;
};

export const createProfile = async (input: createProfile) => {
  try {
    const db = await getDb();

    const createProfile = await db.collection(collectionNameProfile).insertOne({
      ...input,
      UserId: new ObjectId(input.UserId),
    });
    if (!createProfile) {
      throw new Error("Failed to create profile");
    }

    return createProfile;
  } catch (error) {
    errorHandler(error);
  }
};

export const getProfile = async (UserId: string) => {
  try {
    const db = await getDb();

    const profile = await db.collection(collectionNameProfile).findOne({
      UserId: new ObjectId(UserId),
    });

    if (!profile) {
      throw new Error("User not found");
    }

    return profile;
  } catch (error) {
    errorHandler(error);
    throw error;
  }
};

export const getAllProfile = async (currentId: string) => {
  try {
    const db = await getDb();
    const currentIdObjectId = new ObjectId(currentId);

    const profiles = await db
      .collection(collectionNameProfile)
      .find({
        UserId: { $ne: currentIdObjectId },
      })
      .toArray();

    if (!profiles) {
      throw new Error("No profiles found");
    }

    return profiles;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const updateProfile = async (input: createProfile, userId: string) => {
  try {
    const db = await getDb();

    const updateDoc = {
      $set: {
        name: input.name,
        birthday: input.birthday,
        gender: input.gender,
        height: input.height,
        weight: input.weight,
        horoscope: input.horoscope,
        zodiac: input.zodiac,
        interests: input.interests,
      },
    };

    const result = await db
      .collection(collectionNameProfile)
      .updateOne({ UserId: new ObjectId(userId) }, updateDoc);

    if (result.modifiedCount === 0) {
      return { message: "No changes made", result };
    }

    return { message: "Profile updated successfully", result };
  } catch (error) {
    throw errorHandler(error);
  }
};
