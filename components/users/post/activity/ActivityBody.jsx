import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  ListItemIcon,
  Divider,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./styles/activityHeader.module.scss";
import {
  deletePostImg,
  deleteUserActivityPost,
  fetchAllUserPosts,
} from "../../../../features/slice/post/postSlice";
import Loading from "../../../config/Loader";
import { format } from "timeago.js";
import ActivityFooter from "./ActivityFooter";
import PersonAdd from "@mui/icons-material/PersonAdd";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HideSourceOutlinedIcon from "@mui/icons-material/HideSourceOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import router from "next/router";
import moment from "moment";
import Router from "next/router";
import axios from "axios";
import baseUrl from "../../../config/Axios";
import { Waypoint } from "react-waypoint";

const ActivityBody = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoading, isError, isSuccess, message, myposts } = useSelector(
    (state) => state.posts
  );
  useEffect(() => {
    dispatch(fetchAllUserPosts(user?.data?.user?._id));
  }, [user?.data?.user?._id]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeletePost = async (id) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/posts/${id}`);
      // .catch((err) => console.log(err));
      if (data) {
        console.log(data);
        dispatch(deleteUserActivityPost(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  let [shouldPlay, updatePlayState] = useState(false);

  let handleEnterViewport = function () {
    updatePlayState(true);
  };
  let handleExitViewport = function () {
    updatePlayState(false);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Grid container p={0}>
        {/* <Stack direction={"row"}> */}

        {myposts?.results?.map((post) => (
          <div key={post._id} className={Styles.activityBody}>
            <Stack direction={"row"}>
              <Grid item xs={4}>
                <Grid container alignItems={"center"}>
                  <Grid item>
                    <IconButton>
                      <Avatar
                        alt="Remy Sharp"
                        src={post?.userId?.avater?.filename}
                        sx={{ height: 40, width: 40 }}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2" component="body2">
                      {post?.userId?.username}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={7}>
                <Grid container p={2} spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {post?.visibility} |
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {format(post?.createdAt)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} p={1}>
                <IconButton>
                  <MoreHorizOutlinedIcon onClick={handleClick} />
                </IconButton>
              </Grid>
            </Stack>

            <Grid itemxs={12} p={2}>
              <Typography variant="subtitle2">{post?.description} </Typography>
            </Grid>

            <div>
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

              {post?.img?.length === 3 && (
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

              {post?.img?.length === 2 && (
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
              {post?.video && (
                <div className={Styles.videoBox}>
                  {post?.video?.map((x, index) => (
                    <Waypoint
                      onEnter={handleEnterViewport}
                      onLeave={handleExitViewport}
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
            </div>
            {/* <div> */}
            <ActivityFooter post={post} />
            {/* </div> */}
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
        ))}
      </Grid>
    </div>
  );
};

export default ActivityBody;
