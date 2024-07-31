// EditAbout.tsx
import { cookies } from "next/headers";
import { ProfileModel } from "@/app/api/typeDef";
import AboutFormEdit from "@/components/aboutFormEdit";

const EditAbout = async () => {
  const cookieStore = cookies();

  const token = cookieStore.toString();

  let profileData: ProfileModel | null = null;
  let error: string | null = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/getProfile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies().toString(),
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch profile");
    const responseJson = await response.json();
    profileData = responseJson.data as ProfileModel;
  } catch (err) {
    error = "Failed to load profile data.";
  }

  return (
    <div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {profileData ? (
        <AboutFormEdit profile={profileData} token={token} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditAbout;
