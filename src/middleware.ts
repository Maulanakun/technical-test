import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readPayloadJose } from "./db/helpers/jwt";

export const middleware = async (request: NextRequest) => {
  if (
    !request.url.includes("/api") &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_next/image") &&
    !request.url.includes("favicon.ico")
  ) {
    // console.log(request.method, request.url);
  }

  if (request.url.includes("/api")) {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    // console.log(token, 1111111111);
    if (
      request.url.includes("/api/register") ||
      request.url.includes("/api/login")
    ) {
      return NextResponse.next();
      // console.log("API", request.method, request.url);
    }

    // ------------- delete later --------------
    // if (request.url.includes("/api/business")) return NextResponse.next();
    // if (request.url.includes("/api/record")) return NextResponse.next();
    // if (request.url.includes("/api/lender")) return NextResponse.next();
    // ------------- delete later --------------

    if (!token) {
      return NextResponse.json(
        {
          status: 401,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }
    const tokenData = await readPayloadJose<{
      id: string;
      username: string;
      email: string;
    }>(token.value);
    const requestHeaders = new Headers(request.headers);
    // set the headers
    requestHeaders.set("x-user-id", tokenData.id);
    requestHeaders.set("x-user-username", tokenData.username);
    requestHeaders.set("x-user-email", tokenData.email);
    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  return NextResponse.next();
};
