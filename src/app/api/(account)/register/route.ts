import { register } from "@/db/models/users";
import { NextResponse } from "next/server";
import { z } from "zod";
import { responseGeneric } from "../../typeDef";
import errorHandler from "../../errorHandler";

const inputSchema = z.object({
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(2),
});

export const POST = async (request: Request) => {
  try {
    const raw = await request.json();
    const parsedData = inputSchema.safeParse(raw);

    if (!parsedData.success) {
      throw parsedData.error;
    }
    const newUser = await register(parsedData.data);
    if (!newUser) {
      throw new Error("Email already exists");
    }

    return NextResponse.json<responseGeneric<unknown>>({
      status: 201,
      message: "success regist",
      data: newUser,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
