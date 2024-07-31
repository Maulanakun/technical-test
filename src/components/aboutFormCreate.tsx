import { responseGeneric } from "@/app/api/typeDef";
import { handleSubmitCreateProfile } from "@/app/(page)/createProfile/action";
import { cookies } from "next/headers";
import ClientInputError from "./clientInputError";

const AboutFormCreate = async () => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg min-h-screen  mx-auto">
      <form action={handleSubmitCreateProfile} className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">About</h2>
          <button className="text-yellow-500" type="submit">
            Save & Update
          </button>
        </div>
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-gray-300">+</span>
          </div>
          <span className="ml-4">Add image</span>
        </div>
        <div className="mb-4 text-red-500 font-bold text-center">
          <ClientInputError />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Display name:
          </label>
          <input
            name="name"
            type="text"
            placeholder="Enter name"
            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md py-2 px-3 focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Gender:
          </label>
          <select
            name="gender"
            className="mt-1 block w-full max-w-full bg-gray-800 border border-gray-700 text-white rounded-md py-2 px-3 focus:ring-2 focus:ring-yellow-500"
          >
            <option>Select Gender</option>
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Birthday:
          </label>
          <input
            name="birthday"
            type="date"
            placeholder="DD MM YYYY"
            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md py-2 px-3 focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Horoscope:
          </label>
          <input
            name="horoscope"
            type="text"
            placeholder="--"
            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md py-2 px-3 focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Zodiac:
          </label>
          <input
            name="zodiac"
            type="text"
            placeholder="--"
            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md py-2 px-3 focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Height:
          </label>
          <input
            name="height"
            type="text"
            placeholder="Add height"
            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md py-2 px-3 focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Weight:
          </label>
          <input
            name="weight"
            type="text"
            placeholder="Add weight"
            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md py-2 px-3 focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        {/* Interest Section */}
        <div className="bg-gray-800 p-4 rounded-md mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold">Interest</h3>
            <button className="text-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <input
            name="interests"
            type="text"
            placeholder="Add in your interest to find a better match"
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-md py-2 px-3 focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </form>
    </div>
  );
};

export default AboutFormCreate;
