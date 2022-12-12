import React, { useRef, useState, useEffect } from "react";

import Styles from "./styles/chatBox.module.scss";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { Avatar } from "@mui/material";
import ChatHeader from "./ChatHeader";
import { format } from "timeago.js";
// import SendMessage from "./SendMessage";
// import { io } from "socket.io-client";
import ReactAudioPlayer from "react-audio-player";
// import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const ChatBox = ({ chat, userId, chatMessages, doReload, loading }) => {
  const { user } = useSelector((state) => state.auth);
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [doReload]);
  let ownMes = chat?.senderId === userId || chat?.senderId?._id === userId;
  return (
    <>
      {loading ? (
        "loading....."
      ) : (
        <div id="chat-box" className="chat____wrapper" ref={scroll}>
          {ownMes && (
            <div className={ownMes && "ownMsg"}>
              {chat?.text && (
                <div className={"text"}>
                  <p>{chat?.text}</p>
                  <span>{format(chat?.createdAt)}</span>
                </div>
              )}

              {chat?.file && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <img
                    src={chat?.file?.img}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "10px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "10px",
                      padding: "10px",
                    }}
                  >
                    {format(chat?.createdAt)}
                  </span>
                </div>
              )}
              {chat?.audio && (
                <div>
                  <ReactAudioPlayer src={chat?.audio} controls />
                </div>
              )}
              <Avatar
                alt="Remy Sharp"
                src={user?.data?.user?.avater?.filename}
                sx={{ width: 30, height: 30, marginRight: 1 }}
              />
            </div>
          )}

          {!ownMes && (
            <div
              className={
                chat?.senderId !== userId || chat?.senderId?._id !== userId
              }
            >
              <Avatar
                alt="Remy Sharp"
                src={chat?.receiverId?.avater?.filename}
                sx={{ width: 30, height: 30, marginRight: 1 }}
              />

              {chat?.text && (
                <div className={"text"}>
                  <p>{chat?.text}</p>
                  <span>{format(chat?.createdAt)}</span>
                </div>
              )}

              {chat?.file && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <img
                    src={chat?.file?.img}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "10px",
                      backgroundColor: "red",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "10px",
                      padding: "10px",
                    }}
                  >
                    {format(chat?.createdAt)}
                  </span>
                </div>
              )}
              {chat?.audio && (
                <div>
                  <ReactAudioPlayer src={chat?.audio} controls />
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {/* ))} */}
    </>
  );
};

export default ChatBox;
