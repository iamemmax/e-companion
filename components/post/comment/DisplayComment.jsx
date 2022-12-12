import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  CardActions,
  ListItemIcon,
  PersonAdd,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { FaShare } from "react-icons/fa";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import Image from "next/image";
import AddReply from "./AddReply";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import baseUrl from "../../config/Axios";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComments,
  deleteReplys,
} from "../../../features/slice/post/postSlice";

export default function DisplayComment({ post }) {
  const [open, setOpen] = useState(false);
  const [commentId, setCommentId] = useState("");
  const { user } = useSelector((state) => state.auth);
  const handleOpen = (id) => {
    setOpen(true);

    setCommentId(id);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  // const [deleteComment, setDeleteComment] = useState(false);
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteComment = async (id) => {
    try {
      const { data } = await axios.delete(
        `${baseUrl}/comments/remove-comment/${post._id}/${id}`
      );
      dispatch(deleteComments(id));
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  // };
  const handleDeleteReply = async (id) => {
    try {
      const { data } = await axios.delete(
        `${baseUrl}/comments/remove-reply/${post._id}/${id}`
      );
      dispatch(deleteReplys(id));
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete comment functionality

  return post?.comments?.map((x) => (
    <div key={x._id}>
      <Card sx={{ border: "0.5px solid #eee", marginBottom: "1rem" }}>
        <CardHeader
          avatar={
            <Avatar aria-label="userImg">
              <img
                src={x?.commentBy?.avater?.filename}
                alt={x?.commentBy?.username}
                sx={{ width: 20, height: 0 }}
              />
              {/* <Image src={x?.commentBy?.avater?.filename} layout="fill" objectFit="cover" /> */}
            </Avatar>
          }
          action={
            (console.log(x?.commentBy?.username, user?.data?.user?.username),
            x?.commentBy?.username === user?.data?.user?.username ? (
              <IconButton
                aria-label="settings"
                // onClick={(e) => handleClick(e, x._id)}
                onClick={() => deleteComment(x._id)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            ) : null)
          }
          title={x?.commentBy?.username}
          subheader={
            <span style={{ marginLeft: "1rem", fontSize: "0.8rem" }}>
              {moment(x?.createdAt).startOf("day").fromNow()}
            </span>
          }
        />
        <Divider />
        <CardContent>
          <Typography paragraph variant="body2" color="text.secondary">
            {x?.comment}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="share">
            <FaShare onClick={() => handleOpen(x._id)} />
          </IconButton>
        </CardActions>
        <AddReply
          setOpen={setOpen}
          open={open}
          x={x}
          post={post}
          commentId={commentId}
        />
      </Card>

      <ul>
        {post?.replies?.map(
          (reply, i) =>
            x._id === reply.commentId && (
              <Card
                sx={{ border: "0.5px solid #eee", marginBottom: "1rem" }}
                key={reply._id}
              >
                <CardHeader
                  avatar={
                    <Avatar aria-label="userImg">
                      <img
                        src={reply?.replyBy?.avater?.filename}
                        alt={x?.commentBy?.username}
                        sx={{ width: "100%", height: "100%" }}
                      />
                      {/* <Image src={x?.commentBy?.avater?.filename} layout="fill" objectFit="cover" /> */}
                    </Avatar>
                  }
                  action={
                    (console.log(
                      reply?.replyBy?.username,
                      user?.data?.user?.username
                    ),
                    reply?.replyBy?.username === user?.data?.user?.username ? (
                      <IconButton
                        aria-label="settings"
                        onClick={() => handleDeleteReply(reply?._id)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    ) : null)
                  }
                  title={reply?.replyBy?.username}
                  subheader={
                    <span style={{ marginLeft: "1rem", fontSize: "0.8rem" }}>
                      {moment(reply?.createdAt).startOf("day").fromNow()}
                    </span>
                  }
                />
                <Divider />
                <CardContent>
                  <Typography paragraph variant="body2" color="text.secondary">
                    {reply?.reply}
                  </Typography>
                </CardContent>
              </Card>
            )
        )}
      </ul>

      {/* comment memu */}
      {/* <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.32))",
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
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={deleteComment}>
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu> */}
    </div>
  ));
}
