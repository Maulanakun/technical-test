import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleSubmitCreateProfile = async (formData: FormData) => {
  "use server";
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/createProfile`,
    {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        gender: formData.get("gender"),
        birthday: formData.get("birthday"),
        height: formData.get("height"),
        weight: formData.get("weight"),
        horoscope: formData.get("horoscope"),
        zodiac: formData.get("zodiac"),
        interests: formData.get("interests"),
      }),
      headers: {
        "content-type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );
  const responseJson = await response.json();

  if (!response.ok) {
    let message = responseJson.error;
    redirect(`/createProfile?error=${message}`);
  }

  return redirect("/home");
};
