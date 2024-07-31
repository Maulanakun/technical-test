import { NextRequest, NextResponse } from "next/server";
import { getMessages } from "@/db/models/message";
import errorHandler from "../errorHandler";
import { responseGeneric } from "../typeDef";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const receiverId = searchParams.get("userId") as string;
    const accountId = request.headers.get("x-user-id") as string;
    const messages = await getMessages(accountId, receiverId);

    return NextResponse.json<responseGeneric<typeof messages>>({
      status: 200,
      message: "Messages retrieved successfully",
      data: messages,
    });
  } catch (error) {
    return errorHandler(error); // Pastikan errorHandler mengembalikan respons
  }
};
