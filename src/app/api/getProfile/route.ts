import { getProfile } from "@/db/models/profile";
import { responseGeneric } from "../typeDef";
import { NextResponse } from "next/server";
import errorHandler from "../errorHandler";

export const GET = async (request: Request) => {
  try {
    const UserId = request.headers.get("x-user-id") as string;

    const findProfile = await getProfile(UserId);

    return NextResponse.json<responseGeneric<unknown>>({
      status: 201,
      message: "User has been found",
      data: findProfile,
    });
  } catch (error) {
    return errorHandler(error); // Pastikan errorHandler mengembalikan respons
  }
};
