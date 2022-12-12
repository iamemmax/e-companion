import { Avatar, Button, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import baseUrl from "../config/Axios";
import Styles from "./styles/chatBox.module.scss";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
// import { Peer } from "peerjs";
import Peer from "simple-peer";
import Head from "next/head";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import VideoCall from "./VideoCall";
import VideoNotification from "./Notification/VideoNotification";
import Options from "./option/Option";

const ChatHeader = ({ setRecentChat, recieverChat }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  // const socket = useRef();
  const userId = user?.data?.user?.peerId;

  const handleClickOpen = (id) => {
    setOpen(true);
    // setIdToCall(id);
    // console.log(id);
  };

  // const [stream, setStream] = useState(null);
  // const [me, setMe] = useState("");
  // const [patnerId, setPatnerId] = useState(null);
  // const [call, setCall] = useState({});
  // const [callAccepted, setCallAccepted] = useState(false);
  // const [callEnded, setCallEnded] = useState(false);
  // const [Name, setName] = useState("");
  // // const [socket, setSocket] = useState(null);
  // const myVideo = useRef();
  // const userVideo = useRef();
  // const connectionRef = useRef();
  // const socket = useRef();

  // useEffect(() => {
  //   socket.current = io("https://companion-api.vercel.app");
  //   navigator.mediaDevices
  //     .getUserMedia({
  //       video: true,
  //       audio: true,
  //     })
  //     .then((currentStream) => {
  //       setStream(currentStream);
  //       if (myVideo.current) {
  //         myVideo.current.srcObject = currentStream;
  //       }
  //     });
  //   socket.current.on("me", (id) => setMe(id));
  //   socket.current.emit("me", (id) => setMe(id));

  //   socket.current.on("calluser", ({ from, name: callerName, signal }) => {
  //     setCall({ isReceivedCall: true, from, name: callerName, signal });
  //   });
  // }, []);

  // // console.log(me);

  // const answerCall = () => {
  //   setCallAccepted(true);

  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream: stream,
  //   });

  //   peer.on("signal", (data) => {
  //     socket.current.emit("answercall", { signal: data, to: call.from });
  //   });

  //   peer.on("stream", (currentStream) => {
  //     if ("srcObject" in myVideo) {
  //       myVideo.current.srcObject = currentStream;
  //     }
  //   });

  //   peer.signal(call.signal);

  //   connectionRef.current = peer;
  // };

  // const callUser = (id) => {
  //   const peer = new Peer({ initiator: true, trickle: false, stream: stream });
  //   console.log(peer.id);
  //   peer.on("signal", (data) => {
  //     socket.current.emit("calluser", {
  //       userToCall: id,
  //       signalData: data,
  //       from: me,
  //       name: recieverChat?.username,
  //     });
  //   });

  //   peer.on("stream", (currentStream) => {
  //     if ("srcObject" in userVideo) {
  //       userVideo.current.srcObject = currentStream;
  //     }
  //   });

  //   socket.current.on("callaccepted", (signal) => {
  //     setCallAccepted(true);

  //     peer.signal(signal);
  //   });

  //   connectionRef.current = peer;
  // };

  // const leaveCall = () => {
  //   setCallEnded(true);

  //   connectionRef.current.destroy();

  //   window.location.reload();
  // };

  let socket = useRef();

  const [idToCall, setIdToCall] = useState("");
  const [me, setMe] = useState("");
  const [patnerId, setPartnerId] = useState("");
  const [reeivingCall, setReceiveingCall] = useState(false);
  const [stream, setStream] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideoRef = useRef();
  const userVideoRef = useRef();
  const currentionRef = useRef();
  useEffect(() => {
    socket.current = io("https://e-companion.onrender.com");
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(stream);

        // myVideoRef.current.srcObject = stream;
      } catch (error) {
        console.log(error);
      }
    };

    socket.current.on("me", (id) => {
      setMe(id);
    });

    socket.current.on("getPatner", (data) => {
      setPartnerId(data?.socketId);
    });
    socket.current.emit("addUser", user?.data?.user);

    socket.current.on("calluser", (data) => {
      setReceiveingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
    getUserMedia();
  }, [recieverChat]);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("calluser", {
        userToCall: id,
        signaData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideoRef.current.srcObject = stream;
    });
    socket.current.on("callaccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    currentionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("answercall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideoRef.current.srcObject = stream;
    });

    // peer.signal(callerSignal);
    currentionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    currentionRef.current.destroy();
    window.location.reload();
  };
  console.log(me, "me");
  console.log(patnerId, "patne");

  return (
    <div className={Styles.chat__header}>
      {recieverChat && (
        <div className={Styles.UserInfo}>
          <Avatar
            alt="Remy Sharp"
            src={recieverChat?.avater?.filename}
            sx={{ height: 40, width: 40, marginRight: 2 }}
          />
          <Typography variant="body2">{recieverChat?.username}</Typography>
        </div>
      )}
      {me && me}

      <VideoCall
        open={open}
        setOpen={setOpen}
        recieverChat={recieverChat}
        user={user?.data?.user}
        handleClickOpen={handleClickOpen}
        reeivingCall={reeivingCall}
        caller={caller}
        callAccepted={callAccepted}
        callEnded={callEnded}
        stream={stream}
        myVideoRef={myVideoRef}
        userVideoRef={userVideoRef}
        name={name}
        leaveCall={leaveCall}
        me={me}
        setName={setName}
        idToCall={idToCall}
        setIdToCall={setIdToCall}
        callUser={callUser}
        patnerId={patnerId}
      />

      <VideoNotification
        callAccepted={callAccepted}
        userVideoRef={userVideoRef}
        answerCall={answerCall}
        caller={caller}
        myVideoRef={myVideoRef}
        reeivingCall={reeivingCall}
        name={name}
        stream={stream}
        leaveCall={leaveCall}
      />

      <div>
        <IconButton onClick={() => handleClickOpen()}>
          <PhoneOutlinedIcon />
          {/* {me} */}
        </IconButton>

        {/* <IconButton>
          <VideocamOutlinedIcon />
        </IconButton> */}
        <IconButton
          sx={{ display: { md: "none" } }}
          onClick={() => setRecentChat((prev) => !prev)}
        >
          <MoreVertOutlinedIcon />
        </IconButton>
      </div>

      {/* <Options
        me={me}
        callAccepted={callAccepted}
        Name={Name}
        patnerId={patnerId}
        setName={setName}
        callEnded={callEnded}
        leaveCall={leaveCall}
        recieverChat={recieverChat}
        callUser={callUser}
        user={user}
      /> */}
      {/* {receivedCall && !callAccepted && ( */}

      {/* )} */}

      {/* {myVideo && myVideo} */}
    </div>
  );
};

export default ChatHeader;
