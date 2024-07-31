import { getAllProfile, getProfile } from "@/db/models/profile";
import { responseGeneric } from "../typeDef";
import { NextResponse } from "next/server";
import errorHandler from "../errorHandler";

export const GET = async (request: Request) => {
  try {
    const id = request.headers.get("x-user-id") as string;
    const findAllProfile = await getAllProfile(id);

    return NextResponse.json<responseGeneric<unknown>>({
      status: 201,
      message: "User has been found",
      data: findAllProfile,
    });
  } catch (error) {
    return errorHandler(error); // Pastikan errorHandler mengembalikan respons
  }
};
