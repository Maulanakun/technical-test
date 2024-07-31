"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { ProfileModel } from "@/app/api/typeDef";
import { useRouter } from "next/navigation";

interface AboutFormEditProps {
  profile: ProfileModel;
  token: string;
}

const AboutFormEdit = ({ profile, token }: AboutFormEditProps) => {
  const [inputAbout, setInputAbout] = useState<ProfileModel>(profile);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setInputAbout(profile);
  }, [profile]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === "interests") {
      const interestsArray = value
        .split(",")
        .map((interest) => interest.trim());
      setInputAbout((prevState) => ({
        ...prevState,
        interests: interestsArray,
      }));
    } else {
      setInputAbout((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/updateProfile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: token,
          },
          body: JSON.stringify(inputAbout),
        }
      );
      if (!response.ok) throw new Error("Failed to update profile");
      router.push("/");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg min-h-screen mx-auto">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">About</h2>
          <button className="text-yellow-500" type="submit">
            Save & Update
          </button>
        </div>
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <input type="file" accept="image/*" className="hidden" />
            <span className="text-gray-300">+</span>
          </div>
          <span className="ml-4">Add image</span>
        </div>
        {error && (
          <div className="mb-4 text-red-500 font-bold text-center">{error}</div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Display name:
          </label>
          <input
            name="name"
            type="text"
            value={inputAbout.name}
            onChange={handleChange}
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
            value={inputAbout.gender}
            onChange={handleChange}
            className="mt-1 block w-full max-w-full bg-gray-800 border border-gray-700 text-white rounded-md py-2 px-3 focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Birthday:
          </label>
          <input
            name="birthday"
            type="date"
            value={inputAbout.birthday}
            onChange={handleChange}
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
            value={inputAbout.horoscope}
            onChange={handleChange}
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
            value={inputAbout.zodiac}
            onChange={handleChange}
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
            value={inputAbout.height}
            onChange={handleChange}
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
            value={inputAbout.weight}
            onChange={handleChange}
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
            value={inputAbout.interests.join(",")}
            onChange={handleChange}
            placeholder="Add in your interest to find a better match"
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-md py-2 px-3 focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </form>
    </div>
  );
};

export default AboutFormEdit;
