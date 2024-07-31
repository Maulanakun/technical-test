import ChatComponent from "@/components/chatRoom";
import { cookies } from "next/headers";
import React from "react";

const Chat = () => {
  const cookieStore = cookies();
  const token = cookieStore.toString();

  return (
    <div>
      <ChatComponent token={token} />
    </div>
  );
};

export default Chat;
