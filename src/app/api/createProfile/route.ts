import { createProfile, getProfile } from "@/db/models/profile";
import { z } from "zod";
import errorHandler from "../errorHandler";
import { NextResponse } from "next/server";
import { responseGeneric } from "../typeDef";

const inputSchema = z.object({
  name: z.string().nonempty(),
  gender: z.string().nonempty(),
  birthday: z.string().nonempty(),
  height: z.number().min(1),
  horoscope: z.string().optional(),
  zodiac: z.string().optional(),
  weight: z.number().min(1),
  interests: z.array(z.string()).nonempty(), // pastikan 'interests' adalah array berisi string
  UserId: z.string().nonempty(),
});

export const POST = async (request: Request) => {
  try {
    let raw = await request.json();
    const userId = request.headers.get("x-user-id") as string;

    let changeInterestToArray: [] = [];
    if (raw) {
      if (raw.interests) {
        changeInterestToArray = raw.interests.split(" ");
      }
    }
    const result = {
      ...raw,
      height: Number(raw.height),
      weight: Number(raw.weight),
      interests: changeInterestToArray,
      UserId: userId,
    };
    let parsedData = inputSchema.safeParse(result);
    if (!parsedData.success) {
      throw parsedData.error;
    }

    await createProfile(parsedData.data);

    return NextResponse.json<responseGeneric<unknown>>({
      status: 201,
      message: "Profile has been created",
    });
  } catch (error) {
    return errorHandler(error);
  }
};
