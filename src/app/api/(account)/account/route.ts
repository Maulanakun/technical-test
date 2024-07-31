import { NextResponse } from "next/server";
import { responseGeneric } from "../../typeDef";
import { findByEmail } from "@/db/models/users";
import errorHandler from "../../errorHandler";

export const GET = async (request: Request) => {
  try {
    const email = request.headers.get("x-user-email");

    if (!email) {
      throw new Error("Invalid login");
    }

    const foundUser = await findByEmail(email);

    return NextResponse.json<responseGeneric<unknown>>({
      status: 201,
      message: "success to find",
      data: foundUser,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
