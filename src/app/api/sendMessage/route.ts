import { NextRequest, NextResponse } from "next/server";
import { createMessage, IMessage } from "@/db/models/message";
import errorHandler from "../errorHandler";
import { responseGeneric } from "../typeDef";

export const POST = async (request: NextRequest) => {
  try {
    const { receiverId, message } = await request.json();

    if (!request.headers.get("x-user-id") || !message) {
      return NextResponse.json<responseGeneric<null>>({
        status: 400,
        message: "User and message are required",
        data: null,
      });
    }

    const newMessage = {
      senderId: request.headers.get("x-user-id") as string,
      message,
      timestamp: new Date(),
      receiverId,
    };

    await createMessage(newMessage);

    return NextResponse.json<responseGeneric<null>>({
      status: 200,
      message: "Message sent successfully",
      data: null,
    });
  } catch (error) {
    return errorHandler(error); // Pastikan errorHandler mengembalikan respons
  }
};
