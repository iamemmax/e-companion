import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { UserById } from "../../features/slice/users/UserSlice";
import Styles from "../layouts/styles/chat.module.scss";
import { styled } from "@mui/material/styles";
import { Badge, Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import baseUrl from "../config/Axios";

const RecentChat = ({
  currentUserId,
  chat,
  onlineUser,
  online,
  notification,
}) => {
  // const userId = chat?.members.find((member) => member !== currentUserId);
  const { user } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  let socket;
  const router = useRouter();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  //
  // const recentMessages = onlineUser?.members?.find(
  //   (x) => x?._id !== currentUserId
  // );
  // const recentMessages = onlineUser?.map((x) =>
  //   x.members?.find((x) => x?._id !== currentUserId)
  // );
  // console.log(online.map((x) => x.username));

  return (
    <div>
      {onlineUser?.map((x) => (
        <div key={x?.id}>
          <div
            className="user_chat_wrapper"
            // className={user_chat_wrapper}
            key={x?.id}
            onClick={() => router.push(`/chat/${x?._id}`)}
          >
            {x?.members?.map((member) =>
              member?._id !== currentUserId ? (
                <div key={member?._id} className="recentBox">
                  <div className={"avater"}>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={member?.avater?.filename}
                        sx={{ height: 30, width: 30 }}
                      />
                    </StyledBadge>
                  </div>
                  <div className={"user_name"}>
                    <div className="name">{member?.username}</div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentChat;
// <div
//   style={{
//     display: "flex",
//     justifyContent: "flex-start",
//     border: "2px solid red",
//     width: "100%",
//     alignItems: "center",
//   }}
// >
//   <div className={"avater"}>
//     <StyledBadge
//       overlap="circular"
//       anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       variant={online ? "dot" : ""}
//     >
//       <Avatar
//         alt="Remy Sharp"
//         src={x?.avater?.filename}
//         sx={{ height: 40, width: 40 }}
//       />
//     </StyledBadge>
//   </div>
//   <div className={"user_name"}>
//     <div className="name">{x?.username}</div>
//   </div>
// </div>;
