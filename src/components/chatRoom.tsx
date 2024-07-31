"use client";
// Contoh penggunaan API di komponen chat
import { IMessage } from "@/db/models/message";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Props {
  token: string;
}

const ChatComponent = ({ token }: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const recipientId = useSearchParams().get("id");

  const fetchMessages = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/viewMessage?userId=${recipientId}`,
      {
        method: "GET",
        headers: {
          Cookie: token,
        },
      }
    );
    const data = await response.json();
    setMessages(data.data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: token,
        },
        body: JSON.stringify({
          receiverId: recipientId,
          message: newMessage,
        }),
      }
    );

    if (response.ok) {
      setNewMessage("");
      fetchMessages();
    } else {
      console.error("Failed to send message");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [recipientId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-4">Chat Room</h1>
      <div className="mb-4">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-800 rounded">
              <p className="font-bold">{msg.senderName}</p>
              <p>{msg.message}</p>
              <p className="text-sm text-gray-400">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No messages yet. Start the conversation!
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <textarea
          placeholder="Type your message here"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="p-2 bg-gray-700 border border-gray-600 rounded"
          rows={3}
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 rounded text-white hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
