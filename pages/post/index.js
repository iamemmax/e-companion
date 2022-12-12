import React, { useEffect, useState, useRef } from "react";
import ChatLayout from "../../components/layouts/ChatLayout";
import Messages from "../../components/post/Messages";
import PostHeader from "../../components/post/PostHeader";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/config/Loader";
import { fetchPosts } from "../../features/slice/post/postSlice";

function PostIndex() {
  const dispatch = useDispatch();
  const theme = useTheme();
const socket = useRef()
  const { isLoading, posts } = useSelector((state) => state.posts);
  useEffect(() => {

    dispatch(fetchPosts());
   
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ChatLayout>
      <PostHeader />
      {/* <Messages /> */}

      <div>
        {/* <></> */}
        {posts?.length > 0 && posts?.map((post) => (
          <Messages post={post} key={post?._id} />
        ))}
      </div>
    </ChatLayout>
  );
}

// data.userToken

export default PostIndex;
