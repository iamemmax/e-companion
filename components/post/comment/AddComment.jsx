import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

import { io } from "socket.io-client";
import axios from "axios";
import baseUrl from "../../config/Axios";
import {
  addComment,
  showComment,
} from "../../../features/slice/post/postSlice";

export default function AddComment({ setOpen, open, post }) {
  const socket = useRef();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // socket.current = io("https://companion-api.vercel.app");
    socket.current = io("https://e-companion.onrender.com");
    socket.current.emit("setup", user?.data?.user);
  }, []);
  // open comment box
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    try {
      const { data } = await axios.put(
        `${baseUrl}/comments/add-comment/${post?._id}`,
        { comment: comment }
      );
      if (data) {
        socket.current.emit("add comment", data?.data);
        setComment("");
        dispatch(addComment({ id: post._id, data: data?.data?.comments }));
        setLoading(false);
        setOpen(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    socket.current.on("get comments", (data) => {
      if (data) {
        console.log(data);
        dispatch(showComment(data.comments));
      }
    });
  }, [comment, dispatch]);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Comment</DialogTitle>
        <form method="put" onSubmit={handleSubmit}>
          <DialogContent sx={{ width: "400px" }}>
            <TextField
              autoFocus
              margin="dense"
              // id="name"
              label="comment"
              type="text"
              multiline
              fullWidth
              value={comment}
              variant="outlined"
              onChange={handleChange}
              // error={touched.comment && Boolean(errors.comment)}
              // helperText={touched.comment && errors.comment}
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
              Comment
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
