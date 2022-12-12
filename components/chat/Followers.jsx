import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
// import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Face6OutlinedIcon from "@mui/icons-material/Face6Outlined";
import baseUrl from "../config/Axios";
import { useRouter } from "next/router";
const Followers = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth?.user);
  const data = auth?.data;
  const [followers, setFollowers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [followerId, setFollowerId] = useState(null);
  const open = Boolean(anchorEl);
  const Router = useRouter();
  const handleClick = (event, d) => {
    setAnchorEl(event.currentTarget);
    setFollowerId(d);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const createConnection = async (id) => {
    const info = {
      senderId: data?.user?._id,
      recieverId: id,
    };
    console.log(info);

    try {
      const { data } = await axios.post(`${baseUrl}/chat`, info);
      if (data) {
        console.log(data);
        const chatId = data?.data?._id;
        Router.push(`/chat/${chatId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRedirect = (id) => {
    console.log(id);
  };

  return (
    <>
      <Typography
        variant="body2"
        align="center"
        style={{
          textAlign: "center",
          padding: "10px",
          background: "#FBF4F4",
          fontWeight: 500,
        }}
        className="followerText"
      >
        My Followers
      </Typography>
      {data?.user?.following?.map((x, index) => (
        <div
          className="followers_friend"
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",

            padding: "0px 10px",
          }}
          key={index}
        >
          <Avatar
            alt={x?.username}
            src={x?.avater?.filename}
            sx={{ height: 30, width: 30, marginRight: "0.5rem" }}
          />

          <p
            onClick={() => console.log(x)}
            style={{ cursor: "pointer", flex: 1 }}
          >
            {x?.username}
          </p>
          <IconButton onClick={(e) => handleClick(e, x._id)}>
            <MoreVertOutlinedIcon />
          </IconButton>
          {/* ... menu */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => createConnection(x?._id)}>
              <ListItemIcon>
                <ChatBubbleOutlineIcon />
              </ListItemIcon>
              chat
            </MenuItem>

            <MenuItem
              onClick={() => Router.push(`/users/followers/${followerId}`)}
            >
              <ListItemIcon>
                <Face6OutlinedIcon />
              </ListItemIcon>
              View Profile
            </MenuItem>
          </Menu>
        </div>
      ))}
    </>
  );
};

export default Followers;
