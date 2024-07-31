"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Profile {
  _id: string;
  name: string;
}

interface Props {
  token: string;
}

const Modal = ({ token }: Props) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/getAllProfile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Cookie: token,
            },
          }
        );
        const data = await response.json();
        setProfiles(data.data);
        setFilteredProfiles(data.data);
      } catch (error) {
        console.error("Failed to fetch profiles", error);
      }
    };

    fetchProfiles();
  }, [token]);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = profiles.filter((profile) =>
      profile.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProfiles(filtered);
  };

  const startChat = (profileId: string) => {
    router.push(`/chat?id=${profileId}`);
  };

  return (
    <div>
      <button
        className="text-sm text-gray-400 hover:text-white"
        onClick={openModal}
      >
        ...
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-black">Cari Nama Profile</h3>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Cari nama..."
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <ul className="text-black">
            {filteredProfiles.slice(0, 3).map((profile) => (
              <li
                key={profile._id}
                className="py-2 border-b border-gray-300 flex justify-between items-center"
              >
                <span>{profile.name}</span>
                <button
                  onClick={() => startChat(profile._id)}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Chat
                </button>
              </li>
            ))}
          </ul>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeModal} className="text-black">
              close
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
