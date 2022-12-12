import Header from "../custom/Header";
import Styles from "./styles/chat.module.scss";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Badge, Avatar } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChats } from "../../features/slice/chat/getChat";
import Followers from "../chat/Followers";
import RecentChat from "../chat/RecentChat";

// import Stack from '@mui/material/Stack';

function ChatLayout({ children }) {
  const auth = useSelector((state) => state?.auth?.user);
  const { chats } = useSelector((state) => state?.chat);
  const [userChat, setUserChat] = useState("");
  const [singleUser, setSingleuser] = useState([]);

  const data = auth?.data;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChats(data?.user?._id));
  }, [data]);
  const onlineUser = chats?.userChat;

  // console.log(onlineUser, "online")
  return (
    <>
      <Header />
      <div className={Styles.wrapper}>
        <div className={Styles.user_side}>
          <Typography className={Styles.message__header}>
            Recent Messages
          </Typography>

          <RecentChat currentUserId={data?.user?._id} onlineUser={onlineUser} />
        </div>
        <div className={Styles.user_details}>{children}</div>

        <div className={Styles.sideBar}>
          <Followers />
        </div>
      </div>
    </>
  );
}

export default ChatLayout;
