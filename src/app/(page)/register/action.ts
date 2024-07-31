import { redirect } from "next/navigation";

export const handleSubmit = async (formData: FormData) => {
  "use server";
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`, {
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
  const responseJson = await response.json();
  if (!response.ok) {
    let message = responseJson.error;
    redirect(`/register?error=${message}`);
  }

  return redirect(`/login`);
};
