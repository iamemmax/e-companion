import React, { useEffect, useRef, useState } from "react";
import ChatLayout from "../layouts/ChatLayout";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const Chat = () => {
  const { user } = useSelector((state) => state.auth);
  const socket = useRef();
  const userId = user?.data?.user?._id;

  return <ChatLayout>chat</ChatLayout>;
};

export default Chat;
