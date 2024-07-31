import { AccountModel, ProfileModel } from "@/app/api/typeDef";
import { getMongoClientinstance } from "../config";
import { hashPassword } from "../helpers/bcrypts";
import errorHandler from "@/app/api/errorHandler";

export type createUser = Omit<ProfileModel, "_id">;
export type registModel = Omit<AccountModel, "_id">;

const DATABASE_NAME = process.env.DATABASE_NAME;
const collectionNameAccount = "account";

export const getDb = async () => {
  const client = await getMongoClientinstance();
  const db = client.db(DATABASE_NAME);
  return db;
};

export const register = async (input: registModel) => {
  try {
    const db = await getDb();

    const findUser = await db.collection(collectionNameAccount).findOne({
      email: input.email,
    });

    if (findUser) {
      throw new Error("Email already exists");
    } else {
      const hashInput = {
        ...input,
        password: hashPassword(input.password),
      };

      const newRegist = await db
        .collection(collectionNameAccount)
        .insertOne(hashInput);
      return newRegist;
    }
  } catch (error) {
    errorHandler(error);
  }
};

export const login = async (input: registModel) => {
  try {
    const db = await getDb();
    const loginSuccess = await db.collection(collectionNameAccount).findOne({
      email: input.email,
    });

    if (!loginSuccess) {
      throw new Error("Invalid login");
    }
    return loginSuccess;
  } catch (error) {
    errorHandler(error);
  }
};

export const findByEmail = async (email: string) => {
  try {
    const db = await getDb();
    const result = await db.collection(collectionNameAccount).findOne(
      {
        email,
      },
      { projection: { password: 0 } }
    );

    if (!result) {
      throw new Error("User not found");
    }
    return result;
  } catch (error) {
    errorHandler(error);
  }
};
