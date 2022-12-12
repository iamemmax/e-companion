import React, { useEffect, useRef, useState } from "react";
import ChatLayout from "../../components/layouts/ChatLayout";
import axios from "axios";
import SinglePost from "../../components/post/SinglePost";
import DisplayComment from "../../components/post/comment/DisplayComment";
import { Typography } from "@mui/material";
import baseUrl from "../../components/config/Axios";
import { useRouter } from "next/router";
import Loading from "../../components/config/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  showComment,
  showReply,
  singlePost,
} from "../../features/slice/post/postSlice";
import { io } from "socket.io-client";

export default function PostId() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useSelector((state) => state.auth);
  // const socket = useRef();
  // useEffect(() => {
  //   socket.current = io("https://companion-api.vercel.app");
  //   socket.current.emit("setup", user?.data?.user);

    
  // }, []);
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state) => state?.posts);

  useEffect(() => {
    dispatch(singlePost(id));
  }, [id, dispatch]);

  // useEffect(() => {
  //   socket.current.on("get comments", (data) => {
  //     if (data) {
  //        dispatch(showComment(data.comments));
  //    }
  //   })
  //   socket.current.on("get reply", (data) => {
  //     if (data) {
  //        dispatch(showReply(data.replies));
  //    }
  //   })
  // })
  if (isLoading) {
    return <Loading />;
  }
  return (
    <ChatLayout>
      <SinglePost post={post} />
      <div>
        <Typography variant="h6" component="h2" p={4}>
          Comments
        </Typography>
        <DisplayComment post={post} />
      </div>
    </ChatLayout>
  );
}
