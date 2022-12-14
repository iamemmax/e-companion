import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  IconButton,
  Badge,
  Divider,
  Popover,
  Box,
  Typography,
} from "@mui/material";
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
import {
  FacebookShareButton,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
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
  const currentuser = user?.data?.user?._id;
  const [arrivalMessage, setArrivalMessage] = useState([]);

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
    // let info = arrivalMessage?.slice(0, 1);
    // dispatch(likePosts(info));
  }, [arrivalMessage]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openShareIcon = Boolean(anchorEl);
  const id = openShareIcon ? "simple-popover" : undefined; // show share sicon

  return (
    <div>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={6}>
          <IconButton>
            <StyledBadge
              badgeContent={post?.likes.length > 0 ? post?.likes.length : "0"}
              color="primary"
            >
              <ThumbUpOutlinedIcon />
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
          <IconButton onClick={handleClick}>
            <FaShare />
          </IconButton>
          <Popover
            id={id}
            open={openShareIcon}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            style={{
              marginRight: "3rem",
              width: "200px",
              marginTop: "-13rem",
              zIndex: "99",
            }}
          >
            <div>
              <FacebookShareButton
                url={`https://e-companion.vercel.app/post/${post?._id}`}
                quote={post?.description}
                hashtag="#e-cpmanion"
                sx={{ padding: "5px", borderRadius: "50px" }}
              >
                <FacebookIcon
                  size={36}
                  style={{ padding: "5px", borderRadius: "50px" }}
                />
              </FacebookShareButton>
              <TwitterShareButton
                url={`https://e-companion.vercel.app/post/${post?._id}`}
                title={post?.description}
                hashtag="#e-cpmanion"
              >
                <TwitterIcon
                  size={36}
                  style={{ padding: "5px", borderRadius: "50px" }}
                />
              </TwitterShareButton>
              <WhatsappShareButton
                url={`https://e-companion.vercel.app/post/${post?._id}`}
                title={post?.description}
                separator=":: "
              >
                <WhatsappIcon
                  size={36}
                  style={{ padding: "5px", borderRadius: "50px" }}
                />
              </WhatsappShareButton>
              <EmailShareButton
                url={`https://e-companion.vercel.app/post/${post?._id}`}
                title={post?.description}
                separator=":: "
              >
                <EmailIcon
                  size={36}
                  style={{ padding: "5px", borderRadius: "50px" }}
                />
              </EmailShareButton>
            </div>
          </Popover>
        </div>
      </div>

      <AddComment setOpen={setOpen} open={open} post={post} />
    </div>
  );
}

export default PostFooter;
