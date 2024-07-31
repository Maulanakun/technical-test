import { decoded } from "@/db/helpers/jwt";
import { PencilIcon } from "@heroicons/react/16/solid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileModel, responseGeneric } from "../../api/typeDef";
import Modal from "@/components/modal";

interface SessionUser {
  id: string;
  username: string;
  email: string;
  iat: number;
}

const token = cookies().toString();

const LandingPage = async () => {
  const response = await fetch("http://localhost:3000/api/getProfile", {
    method: "GET",
    headers: {
      Cookie: token,
    },
  });
  const responseJson = await response.json();
  const data = responseJson.data as ProfileModel;

  if (responseJson.status === 404) {
    redirect("/createProfile");
  }
  if (!data) {
    redirect("/login");
  }

  const nowYear = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <button className="text-sm text-gray-400 hover:text-white">Back</button>
        <h1 className="text-lg font-bold">@{data.name}</h1>
        <Modal token={token} />
      </div>
      <div className="p-4 space-y-4">
        <div className="relative">
          <img
            src="/path-to-your-image.jpg"
            alt="Background"
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
            <h1 className="text-xl font-bold">
              @{data.name}, {nowYear - Number(data.birthday.split("-")[0])}
            </h1>
            <p className="text-sm">{data.gender}</p>
            <div className="flex space-x-2 mt-2">
              <div className="flex items-center space-x-1 bg-black/60 px-2 py-1 rounded-full">
                <span className="text-lg"></span>
                <span>{data.horoscope}</span>
              </div>
              <div className="flex items-center space-x-1 bg-black/60 px-2 py-1 rounded-full">
                <span className="text-lg">🐖</span>
                <span>{data.zodiac}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-gray-500">About</h2>
            <a href="/editAbout">
              <button
                className="p-1 rounded-full hover:bg-gray-700"
                aria-label="Edit"
              >
                <PencilIcon className="w-5 h-5 text-gray-400" />
              </button>
            </a>
          </div>
          <ul className="mt-2 text-sm text-gray-300 space-y-1">
            <li>
              <span className="text-gray-500">Birthday:</span>{" "}
              {Number(data.birthday.split("-")[2])} /{" "}
              {Number(data.birthday.split("-")[1])} /{" "}
              {Number(data.birthday.split("-")[0])} (
              {nowYear - Number(data.birthday.split("-")[0])})
            </li>
            <li>
              <span className="text-gray-500">Horoscope:</span> {data.horoscope}
            </li>
            <li>
              <span className="text-gray-500">Zodiac:</span> {data.zodiac}
            </li>
            <li>
              <span className="text-gray-500">Height:</span> {data.height} cm
            </li>
            <li>
              <span className="text-gray-500">Weight:</span> {data.weight} kg
            </li>
          </ul>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-gray-500 mb-2">Interest</h2>
            <a href="/editAbout">
              <button
                className="p-1 rounded-full hover:bg-gray-700"
                aria-label="Edit"
              >
                <PencilIcon className="w-5 h-5 text-gray-400" />
              </button>
            </a>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {data.interests.map((interest: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700 text-white rounded-full cursor-pointer"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
