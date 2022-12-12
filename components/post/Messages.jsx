import React, { useEffect, useRef, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import {
  Grid,
  Menu,
  Avatar,
  MenuItem,
  Tooltip,
  IconButton,
  ListItemIcon,
  Divider,
  ListItemAvatar,
  Button,
  ListItemText,
  List,
  ListItem,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useTheme } from "@emotion/react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import PostImgList from "./PostImgList";
import Styles from "./styles/postMessages.module.scss";
import Image from "next/image";
import PersonAdd from "@mui/icons-material/PersonAdd";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HideSourceOutlinedIcon from "@mui/icons-material/HideSourceOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import router from "next/router";
import PostFooter from "./PostFooter";
import moment from "moment";
import Router from "next/router";
import axios from "axios";
import baseUrl from "../config/Axios";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../features/slice/post/postSlice";
import Link from "next/link";
import ReactPlayer from "react-player/lazy";
import { Waypoint } from "react-waypoint";

const Messages = ({ post }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  // const { user, data } = useSelector(state => state.auth)
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeletePost = async (id) => {
    try {
      const { data } = await axios
        .delete(`${baseUrl}/posts/${id}`)
        .catch((err) => console.log(err));
      if (data) {
        console.log(data);
        dispatch(deletePost(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // play video on viewport
  let [shouldPlay, updatePlayState] = useState(false);

  let handleEnterViewport = function () {
    updatePlayState(true);
  };
  let handleExitViewport = function () {
    updatePlayState(false);
  };
  const { user } = useSelector((state) => state.auth);
  let currentUser = user?.data?.user?._id;

  if (post?.visibility === "public") {
    return (
      <div className={Styles.post__wrapper}>
        <Grid
          container
          spacing={isSmall ? 2 : 5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={8} sm={10}>
            <div>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={post?.author?.avater?.filename}
                      sx={{ width: 40, height: 40 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <p style={{ fontWeight: 500, marginBottom: 0 }}>
                        {post?.author?.username}
                      </p>
                    }
                    secondary={
                      <span style={{ fontSize: "0.75rem", fontWeight: 400 }}>
                        {moment(post?.createdAt).startOf("day").fromNow()}
                      </span>
                    }
                  />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid item xs={3} sm={1.5} justifyContent="" alignItems="ri">
            <IconButton onClick={handleClick}>
              <MoreHorizOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Link href={`/post/${post?._id}`}>
          <div
            className="description"
            sx={{ width: "90%", alignItems: "center" }}
          >
            <Typography variant="caption" sx={{ fontSize: "0.8rem" }}>
              {post?.description?.length > 200
                ? post?.description?.substring(0, 190)
                : post?.description}
            </Typography>
          </div>
        </Link>
        {post?.img?.length === 1 && (
          <div className={Styles.post_img_wrapper_1}>
            {post?.img?.slice(0, 1).map((item) => (
              <div key={item?.img} className={Styles.post_img_list_1}>
                <img
                  src={item?.img}
                  srcSet={item?.img}
                  alt={item?.Image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {post?.video && (
          <div className={Styles.videoBox}>
            {post?.video?.map((x, index) => (
              <Waypoint
                onEnter={handleEnterViewport}
                onLeave={handleExitViewport}
                key={x?._video_id}
              >
                <video
                  src={x?.video}
                  key={x?._video_id}
                  autoPlay={shouldPlay}
                  controls
                  className="video__player"
                  loop

                  // playingS
                />
              </Waypoint>
            ))}
          </div>
        )}
        {/* <ReactPlayer url=" /> */}

        {post?.img.length === 3 && (
          <div className={Styles.post_img_wrapper_3}>
            {post?.img?.slice(0, 3).map((item) => (
              <div key={item?.img} className={Styles.post_img_list_3}>
                <img
                  src={item?.img}
                  srcSet={item?.img}
                  alt={item?.Image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {post?.img.length === 2 && (
          <div className={Styles.post_img_wrapper_2}>
            {post?.img?.slice(0, 2).map((item) => (
              <div key={item?.img} className={Styles.post_img_list_2}>
                <img
                  src={item?.img}
                  srcSet={item?.img}
                  alt={item?.Image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {post?.img?.length > 3 && (
          <>
            <div className={Styles.post_img_wrapper_4}>
              {post?.img?.slice(0, 4).map((item) => (
                <div key={item?.img} className={Styles.post_img_list_4}>
                  <img
                    src={item?.img}
                    srcSet={item?.img}
                    alt={item?.Image}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {post?.img?.length > 4 && (
          <>
            <div className={Styles.post_img_wrapper_4}>
              {post?.img?.slice(0, 4).map((item) => (
                <div key={item?.img} className={Styles.post_img_list_4}>
                  <img
                    src={item?.img}
                    srcSet={item?.img}
                    alt={item?.Image}
                    loading="lazy"
                  />
                  <div className={Styles.totalImage}>
                    <Typography>+{post?.img?.length - 4}</Typography>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <PostFooter post={post} />
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
          <MenuItem>
            <BookmarkBorderOutlinedIcon fontSize="small" /> Save Post
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <HideSourceOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Hide Post
          </MenuItem>

          <MenuItem onClick={() => handleDeletePost(post._id)}>
            <ListItemIcon>
              <DeleteOutlineIcon />
            </ListItemIcon>
            Delete Post
          </MenuItem>

          <MenuItem onClick={() => Router.push(`/post/update/${post._id}`)}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit post
          </MenuItem>

          <MenuItem>
            <ListItemIcon>
              <ReportGmailerrorredOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Report post
          </MenuItem>
        </Menu>
      </div>
    );
  }

  if (
    (post?.visibility === "private" &&
      post?.author?.following?.includes(currentUser)) ||
    post?.author?._id === currentUser
  ) {
    return (
      <div className={Styles.post__wrapper}>
        <Grid
          container
          spacing={isSmall ? 2 : 5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={8} sm={10}>
            <div>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={post?.author?.avater?.filename}
                      sx={{ width: 40, height: 40 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <p style={{ fontWeight: 500, marginBottom: 0 }}>
                        {post?.author?.username}
                      </p>
                    }
                    secondary={
                      <span style={{ fontSize: "0.75rem", fontWeight: 400 }}>
                        {moment(post?.createdAt).startOf("day").fromNow()}
                      </span>
                    }
                  />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid item xs={3} sm={1.5} justifyContent="" alignItems="ri">
            <IconButton onClick={handleClick}>
              <MoreHorizOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Link href={`/post/${post?._id}`}>
          <div
            className="description"
            sx={{ width: "90%", alignItems: "center" }}
          >
            <Typography variant="caption" sx={{ fontSize: "0.8rem" }}>
              {post?.description?.length > 200
                ? post?.description?.substring(0, 190)
                : post?.description}
            </Typography>
          </div>
        </Link>
        {post?.img?.length === 1 && (
          <div className={Styles.post_img_wrapper_1}>
            {post?.img?.slice(0, 1).map((item) => (
              <div key={item?.img} className={Styles.post_img_list_1}>
                <img
                  src={item?.img}
                  srcSet={item?.img}
                  alt={item?.Image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {post?.video && (
          <div className={Styles.videoBox}>
            {post?.video?.map((x, index) => (
              <Waypoint
                onEnter={handleEnterViewport}
                onLeave={handleExitViewport}
                key={x?._video_id}
              >
                <video
                  src={x?.video}
                  key={x?._video_id}
                  autoPlay={shouldPlay}
                  controls
                  className="video__player"
                  loop

                  // playingS
                />
              </Waypoint>
            ))}
          </div>
        )}
        {/* <ReactPlayer url=" /> */}

        {post?.img.length === 3 && (
          <div className={Styles.post_img_wrapper_3}>
            {post?.img?.slice(0, 3).map((item) => (
              <div key={item?.img} className={Styles.post_img_list_3}>
                <img
                  src={item?.img}
                  srcSet={item?.img}
                  alt={item?.Image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {post?.img.length === 2 && (
          <div className={Styles.post_img_wrapper_2}>
            {post?.img?.slice(0, 2).map((item) => (
              <div key={item?.img} className={Styles.post_img_list_2}>
                <img
                  src={item?.img}
                  srcSet={item?.img}
                  alt={item?.Image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {post?.img?.length > 3 && (
          <>
            <div className={Styles.post_img_wrapper_4}>
              {post?.img?.slice(0, 4).map((item) => (
                <div key={item?.img} className={Styles.post_img_list_4}>
                  <img
                    src={item?.img}
                    srcSet={item?.img}
                    alt={item?.Image}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {post?.img?.length > 4 && (
          <>
            <div className={Styles.post_img_wrapper_4}>
              {post?.img?.slice(0, 4).map((item) => (
                <div key={item?.img} className={Styles.post_img_list_4}>
                  <img
                    src={item?.img}
                    srcSet={item?.img}
                    alt={item?.Image}
                    loading="lazy"
                  />
                  <div className={Styles.totalImage}>
                    <Typography>+{post?.img?.length - 4}</Typography>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <PostFooter post={post} />
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
          <MenuItem>
            <BookmarkBorderOutlinedIcon fontSize="small" /> Save Post
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <HideSourceOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Hide Post
          </MenuItem>

          <MenuItem onClick={() => handleDeletePost(post._id)}>
            <ListItemIcon>
              <DeleteOutlineIcon />
            </ListItemIcon>
            Delete Post
          </MenuItem>

          <MenuItem onClick={() => Router.push(`/post/update/${post._id}`)}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit post
          </MenuItem>

          <MenuItem>
            <ListItemIcon>
              <ReportGmailerrorredOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Report post
          </MenuItem>
        </Menu>
      </div>
    );
  }

  if (post?.visibility === "for me" && post?.author?._id === currentUser) {
    return (
      <div className={Styles.post__wrapper}>
        <Grid
          container
          spacing={isSmall ? 2 : 5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={8} sm={10}>
            <div>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={post?.author?.avater?.filename}
                      sx={{ width: 40, height: 40 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <p style={{ fontWeight: 500, marginBottom: 0 }}>
                        {post?.author?.username}
                      </p>
                    }
                    secondary={
                      <span style={{ fontSize: "0.75rem", fontWeight: 400 }}>
                        {moment(post?.createdAt).startOf("day").fromNow()}
                      </span>
                    }
                  />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid item xs={3} sm={1.5} justifyContent="" alignItems="ri">
            <IconButton onClick={handleClick}>
              <MoreHorizOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Link href={`/post/${post?._id}`}>
          <div
            className="description"
            sx={{ width: "90%", alignItems: "center" }}
          >
            <Typography variant="caption" sx={{ fontSize: "0.8rem" }}>
              {post?.description?.length > 200
                ? post?.description?.substring(0, 190)
                : post?.description}
            </Typography>
          </div>
        </Link>
        {post?.img?.length === 1 && (
          <div className={Styles.post_img_wrapper_1}>
            {post?.img?.slice(0, 1).map((item) => (
              <div key={item?.img} className={Styles.post_img_list_1}>
                <img
                  src={item?.img}
                  srcSet={item?.img}
                  alt={item?.Image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {post?.video && (
          <div className={Styles.videoBox}>
            {post?.video?.map((x, index) => (
              <Waypoint
                onEnter={handleEnterViewport}
                onLeave={handleExitViewport}
                key={x?._video_id}
              >
                <video
                  src={x?.video}
                  key={x?._video_id}
                  autoPlay={shouldPlay}
                  controls
                  className="video__player"
                  loop

                  // playingS
                />
              </Waypoint>
            ))}
          </div>
        )}
        {/* <ReactPlayer url=" /> */}

        {post?.img.length === 3 && (
          <div className={Styles.post_img_wrapper_3}>
            {post?.img?.slice(0, 3).map((item) => (
              <div key={item?.img} className={Styles.post_img_list_3}>
                <img
                  src={item?.img}
                  srcSet={item?.img}
                  alt={item?.Image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {post?.img.length === 2 && (
          <div className={Styles.post_img_wrapper_2}>
            {post?.img?.slice(0, 2).map((item) => (
              <div key={item?.img} className={Styles.post_img_list_2}>
                <img
                  src={item?.img}
                  srcSet={item?.img}
                  alt={item?.Image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {post?.img?.length > 3 && (
          <>
            <div className={Styles.post_img_wrapper_4}>
              {post?.img?.slice(0, 4).map((item) => (
                <div key={item?.img} className={Styles.post_img_list_4}>
                  <img
                    src={item?.img}
                    srcSet={item?.img}
                    alt={item?.Image}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {post?.img?.length > 4 && (
          <>
            <div className={Styles.post_img_wrapper_4}>
              {post?.img?.slice(0, 4).map((item) => (
                <div key={item?.img} className={Styles.post_img_list_4}>
                  <img
                    src={item?.img}
                    srcSet={item?.img}
                    alt={item?.Image}
                    loading="lazy"
                  />
                  <div className={Styles.totalImage}>
                    <Typography>+{post?.img?.length - 4}</Typography>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <PostFooter post={post} />
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
          <MenuItem>
            <BookmarkBorderOutlinedIcon fontSize="small" /> Save Post
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <HideSourceOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Hide Post
          </MenuItem>

          <MenuItem onClick={() => handleDeletePost(post._id)}>
            <ListItemIcon>
              <DeleteOutlineIcon />
            </ListItemIcon>
            Delete Post
          </MenuItem>

          <MenuItem onClick={() => Router.push(`/post/update/${post._id}`)}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit post
          </MenuItem>

          <MenuItem>
            <ListItemIcon>
              <ReportGmailerrorredOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Report post
          </MenuItem>
        </Menu>
      </div>
    );
  } else {
    return null;
  }

  // return (
  //   <>
  //     { post?.visibility === "form"}
  //     <div className={Styles.post__wrapper}>
  //     <Grid
  //       container
  //       spacing={isSmall ? 2 : 5}
  //       justifyContent="space-between"
  //       alignItems="center"
  //     >
  //       <Grid item xs={8} sm={10}>
  //         <div>
  //           <List
  //             sx={{
  //               width: "100%",
  //               maxWidth: 360,
  //               bgcolor: "background.paper",
  //             }}
  //           >
  //             <ListItem>
  //               <ListItemAvatar>
  //                 <Avatar
  //                   alt="Remy Sharp"
  //                   src={post?.author?.avater?.filename}
  //                   sx={{ width: 40, height: 40 }}
  //                 />
  //               </ListItemAvatar>
  //               <ListItemText
  //                 primary={
  //                   <p style={{ fontWeight: 500, marginBottom: 0 }}>
  //                     {post?.author?.username}
  //                   </p>
  //                 }
  //                 secondary={
  //                   <span style={{ fontSize: "0.75rem", fontWeight: 400 }}>
  //                     {moment(post?.createdAt).startOf("day").fromNow()}
  //                   </span>
  //                 }
  //               />
  //             </ListItem>
  //           </List>
  //         </div>
  //       </Grid>
  //       <Grid item xs={3} sm={1.5} justifyContent="" alignItems="ri">
  //         <IconButton onClick={handleClick}>
  //           <MoreHorizOutlinedIcon />
  //         </IconButton>
  //       </Grid>
  //     </Grid>
  //     <Link href={`/post/${post?._id}`}>
  //       <div
  //         className="description"
  //         sx={{ width: "90%", alignItems: "center" }}
  //       >
  //         <Typography variant="caption" sx={{ fontSize: "0.8rem" }}>
  //           {post?.description?.length > 200
  //             ? post?.description?.substring(0, 190)
  //             : post?.description}
  //         </Typography>
  //       </div>
  //     </Link>
  //     {post?.img?.length === 1 && (
  //       <div className={Styles.post_img_wrapper_1}>
  //         {post?.img?.slice(0, 1).map((item) => (
  //           <div key={item?.img} className={Styles.post_img_list_1}>
  //             <img
  //               src={item?.img}
  //               srcSet={item?.img}
  //               alt={item?.Image}
  //               loading="lazy"
  //             />
  //           </div>
  //         ))}
  //       </div>
  //     )}

  //     {post?.video && (
  //       <div className={Styles.videoBox}>
  //         {post?.video?.map((x, index) => (
  //           <Waypoint
  //             onEnter={handleEnterViewport}
  //             onLeave={handleExitViewport}
  //           >
  //             <video
  //               src={x?.video}
  //               key={x?._video_id}
  //               autoPlay={shouldPlay}
  //               controls
  //               className="video__player"
  //               loop

  //               // playingS
  //             />
  //           </Waypoint>
  //         ))}
  //       </div>
  //     )}
  //     {/* <ReactPlayer url=" /> */}

  //     {post?.img.length === 3 && (
  //       <div className={Styles.post_img_wrapper_3}>
  //         {post?.img?.slice(0, 3).map((item) => (
  //           <div key={item?.img} className={Styles.post_img_list_3}>
  //             <img
  //               src={item?.img}
  //               srcSet={item?.img}
  //               alt={item?.Image}
  //               loading="lazy"
  //             />
  //           </div>
  //         ))}
  //       </div>
  //     )}

  //     {post?.img.length === 2 && (
  //       <div className={Styles.post_img_wrapper_2}>
  //         {post?.img?.slice(0, 2).map((item) => (
  //           <div key={item?.img} className={Styles.post_img_list_2}>
  //             <img
  //               src={item?.img}
  //               srcSet={item?.img}
  //               alt={item?.Image}
  //               loading="lazy"
  //             />
  //           </div>
  //         ))}
  //       </div>
  //     )}

  //     {post?.img?.length > 3 && (
  //       <>
  //         <div className={Styles.post_img_wrapper_4}>
  //           {post?.img?.slice(0, 4).map((item) => (
  //             <div key={item?.img} className={Styles.post_img_list_4}>
  //               <img
  //                 src={item?.img}
  //                 srcSet={item?.img}
  //                 alt={item?.Image}
  //                 loading="lazy"
  //               />
  //             </div>
  //           ))}
  //         </div>
  //       </>
  //     )}
  //     {post?.img?.length > 4 && (
  //       <>
  //         <div className={Styles.post_img_wrapper_4}>
  //           {post?.img?.slice(0, 4).map((item) => (
  //             <div key={item?.img} className={Styles.post_img_list_4}>
  //               <img
  //                 src={item?.img}
  //                 srcSet={item?.img}
  //                 alt={item?.Image}
  //                 loading="lazy"
  //               />
  //               <div className={Styles.totalImage}>
  //                 <Typography>+{post?.img?.length - 4}</Typography>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </>
  //     )}

  //     <PostFooter post={post} />
  //     {/* ... menu */}
  //     <Menu
  //       anchorEl={anchorEl}
  //       id="account-menu"
  //       open={open}
  //       onClose={handleClose}
  //       onClick={handleClose}
  //       PaperProps={{
  //         elevation: 0,
  //         sx: {
  //           overflow: "visible",
  //           filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  //           mt: 1.5,
  //           "& .MuiAvatar-root": {
  //             width: 32,
  //             height: 32,
  //             ml: -0.5,
  //             mr: 1,
  //           },
  //           "&:before": {
  //             content: '""',
  //             display: "block",
  //             position: "absolute",
  //             top: 0,
  //             right: 14,
  //             width: 10,
  //             height: 10,
  //             bgcolor: "background.paper",
  //             transform: "translateY(-50%) rotate(45deg)",
  //             zIndex: 0,
  //           },
  //         },
  //       }}
  //       transformOrigin={{ horizontal: "right", vertical: "top" }}
  //       anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
  //     >
  //       <MenuItem>
  //         <BookmarkBorderOutlinedIcon fontSize="small" /> Save Post
  //       </MenuItem>
  //       <Divider />
  //       <MenuItem>
  //         <ListItemIcon>
  //           <HideSourceOutlinedIcon fontSize="small" />
  //         </ListItemIcon>
  //         Hide Post
  //       </MenuItem>

  //       <MenuItem onClick={() => handleDeletePost(post._id)}>
  //         <ListItemIcon>
  //           <DeleteOutlineIcon />
  //         </ListItemIcon>
  //         Delete Post
  //       </MenuItem>

  //       <MenuItem onClick={() => Router.push(`/post/update/${post._id}`)}>
  //         <ListItemIcon>
  //           <EditIcon fontSize="small" />
  //         </ListItemIcon>
  //         Edit post
  //       </MenuItem>

  //       <MenuItem>
  //         <ListItemIcon>
  //           <ReportGmailerrorredOutlinedIcon fontSize="small" />
  //         </ListItemIcon>
  //         Report post
  //       </MenuItem>
  //     </Menu>
  //   </div>
  //   </>
  // );
};

export default Messages;
