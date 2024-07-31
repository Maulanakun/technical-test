import { AccountModel, responseGeneric } from "@/app/api/typeDef";
import { compareHash } from "@/db/helpers/bcrypts";
import { signToken } from "@/db/helpers/jwt";
import { registModel } from "@/db/models/users";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleSubmit = async (formData: FormData) => {
  "use server";
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login`, {
    method: "POST",
    body: JSON.stringify({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  const responseJson: responseGeneric<AccountModel> = await response.json();
  if (!response.ok) {
    if (!response.ok) {
      let message = responseJson.error;
      redirect(`/login?error=${message}`);
    }
  }
  if (!responseJson) {
    redirect(`/login?error=Invalid%20login`);
  }
  if (!responseJson.data || !responseJson.data.password) {
    redirect(`/login?error=Invalid%20login`);
    return;
  }
  let isMatch = compareHash(
    formData.get("password") as string,
    responseJson.data.password
  );
  if (!isMatch) {
    redirect("/login?error=Invalid%20login");
  }
  const payload = {
    id: responseJson.data._id,
    username: responseJson.data.username,
    email: responseJson.data.email,
  };

  const token = signToken(payload);
  cookies().set("token", token);
  return redirect(`/`);
};
