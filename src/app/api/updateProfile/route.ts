import { updateProfile } from "@/db/models/profile";
import { z } from "zod";
import errorHandler from "../errorHandler";
import { NextResponse } from "next/server";
import { responseGeneric } from "../typeDef";

const inputSchema = z.object({
  _id: z.string().nonempty(),
  name: z.string().nonempty(),
  gender: z.string().nonempty(),
  birthday: z.string().nonempty(),
  height: z.number().min(1),
  horoscope: z.string().optional(),
  zodiac: z.string().optional(),
  weight: z.number().min(1),
  interests: z.array(z.string()).nonempty(),
  UserId: z.string().nonempty(),
});

export const PUT = async (request: Request) => {
  try {
    let raw = await request.json();

    const userId = request.headers.get("x-user-id") as string;

    let changeInterestToArray: string[] = [];

    if (raw) {
      if (typeof raw.interests === "string") {
        changeInterestToArray = raw.interests.split(",");
      } else if (Array.isArray(raw.interests)) {
        changeInterestToArray = raw.interests;
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

    await updateProfile(parsedData.data, userId);

    return NextResponse.json<responseGeneric<unknown>>({
      status: 201,
      message: "Profile has been updated",
    });
  } catch (error) {
    return errorHandler(error);
  }
};
