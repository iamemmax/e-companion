import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";

import Router from "next/router";
import { io } from "socket.io-client";
import { addReply, showReply } from "../../../features/slice/post/postSlice";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import baseUrl from "../../config/Axios";

export default function AddReply({ setOpen, open, post, x, commentId }) {
  // const { id } = Router.params
  // open x box

  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const socket = useRef();
  useEffect(() => {
    // socket.current = io("https://companion-api.vercel.app");
    socket.current = io("https://e-companion.onrender.com");
    socket.current.emit("setup", user?.data?.user);
  }, []);

  const dispatch = useDispatch();

  const [reply, setReply] = useState("");
  const handleChange = (e) => {
    setReply(e.target.value);
  };
  const handleSubmit = async (e) => {
    console.log(commentId, reply);
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    try {
      setReply("");
      const { data } = await axios.put(
        `${baseUrl}/comments/add-reply/${post?._id}`,
        {
          commentId: commentId,
          reply: reply,
        }
      );

      setLoading(false);
      setOpen(false);

      socket.current.emit("add reply", data?.data);
      dispatch(addReply(data?.data));
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };
  useEffect(() => {
    socket.current.on("get reply", (data) => {
      if (data) {
        console.log(data);
        dispatch(showReply(data.replies));
      }
    });
  }, [reply]);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Reply to ${x?.commentBy?.username} comment`}</DialogTitle>
        <form method="post" onSubmit={handleSubmit}>
          <DialogContent sx={{ width: "400px" }}>
            <TextField
              autoFocus
              margin="dense"
              name="reply"
              label="Reply"
              type="text"
              multiline
              fullWidth
              value={reply}
              variant="outlined"
              onChange={handleChange}
              // error={touched.reply && Boolean(errors.comment)}
              // helperText={touched.comment && errors.comment}
            />
            <TextField
              autoFocus
              margin="dense"
              // id="name"
              label="commentId"
              type="text"
              name="commentId"
              multiline
              fullWidth
              value={commentId}
              variant="outlined"
              sx={{ display: "none" }}
            />
          </DialogContent>
          <DialogActions>
            <Button size="small" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              size="medium"
              loading={loading}
              loadingPosition="end"
              variant="outlined"
              type="submit"
            >
              Reply
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
