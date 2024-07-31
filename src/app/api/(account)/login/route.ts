import { z } from "zod";
import errorHandler from "../../errorHandler";
import { findByEmail, login } from "@/db/models/users";
import { NextResponse } from "next/server";
import { responseGeneric } from "../../typeDef";

const inputSchema = z.object({
  // _id: z.string(),
  username: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});
export const POST = async (request: Request) => {
  try {
    const raw = await request.json();
    const parsedData = inputSchema.safeParse(raw);

    if (!parsedData.success) {
      throw parsedData.error;
    }
    const loginSuccess = await login(parsedData.data);

    if (!loginSuccess) {
      throw new Error("Invalid login");
    }

    return NextResponse.json<responseGeneric<unknown>>({
      status: 201,
      message: "success login",
      data: loginSuccess,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
