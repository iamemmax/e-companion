import React, { useState, useEffect, useRef } from "react";
import { Grid, IconButton, Badge, Divider, Typography } from "@mui/material";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { styled } from "@mui/material/styles";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MessageIcon from "@mui/icons-material/Message";
import { FaShare } from "react-icons/fa";
import AddComment from "./comment/AddComment";
import { useDispatch, useSelector } from "react-redux";

import Styles from "./styles/post.footer.module.scss";
import axios from "axios";
import baseUrl from "../config/Axios";
import { likePosts } from "../../features/slice/post/postSlice";
import { io } from "socket.io-client";

function PostFooter({ post }) {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const socket = useRef();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    console.log("222");
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const currentuser = user.data?.user?._id;
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    socket.current = io("https://e-companion.onrender.com");
    socket.current.emit("setup", user?.data?.user);
    socket.current.on("getLikes", (data) => {
      if (data?.author === user?.data?.user?._id) return;
      setArrivalMessage(data);
    });
  }, []);
  const likePost = async (id) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/posts/like/${id}/${currentuser}`
      );
      console.log(data);

      let info = {
        id,
        data: data?.data?.likes,
      };
      socket.current.emit("addLikePost", info);
      dispatch(likePosts(info));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    // dispatch(likePosts(info));
  }, [arrivalMessage]);

  return (
    <div>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={6}>
          <IconButton>
            <StyledBadge
              badgeContent={post?.likes.length > 0 ? post?.likes.length : "0"}
              color="primary"
            >
              {post?.likes?.map((x) =>
                x?.likeBy === user?.data?.user?._id ? (
                  <ThumbUpOutlinedIcon color="primary" />
                ) : (
                  <ThumbUpOutlinedIcon color="secondary" />
                )
              )}
            </StyledBadge>
            {/* likes */}
          </IconButton>
        </Grid>
        <Grid item xs={6} alignItems="flex-end" justifyContent="flex-end">
          <Typography variant="subtitle2">
            {post?.comments.length} comments
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <div className={Styles.container}>
        <div>
          <IconButton onClick={() => likePost(post?._id)}>
            <ThumbUpIcon />
          </IconButton>
        </div>
        <div>
          <IconButton onClick={handleOpen}>
            <MessageIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <FaShare />
          </IconButton>
        </div>
      </div>

      <AddComment setOpen={setOpen} open={open} post={post} />
    </div>
  );
}

export default PostFooter;
