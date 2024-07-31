import { NextResponse } from "next/server";
import { responseGeneric } from "@/app/api/typeDef";
import { ZodError } from "zod";

export default function errorHandler(error: any) {
  let status = 500;
  let errorMessage = "Internal server error";

  if (error instanceof ZodError) {
    status = 400;
    errorMessage = error.issues.map((e) => {
      if (e.message === "String must contain at least 1 character(s)") {
        e.message = "Please fill in the required fields";
      }
      if (e.message === "Number must be greater than or equal to 1") {
        e.message = "Please fill in the required fields";
      }
      if (e.message === "Invalid email") {
        e.message = "Please provide a valid email";
      }
      return e.message;
    })[0];
  }

  if (error instanceof Error) {
    if (error.message === "Email already exists") {
      status = 400;
      errorMessage = "Email already exists";
    }
    if (error.message === "Invalid login") {
      status = 400;
      errorMessage = "Invalid login";
    }
    if (error.message === "User not found") {
      status = 404;
      errorMessage = error.message;
    }
  }

  return NextResponse.json<responseGeneric<never>>(
    {
      status,
      error: errorMessage,
    },
    { status }
  );
}
