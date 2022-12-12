import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { PhoneDisabled } from "@mui/icons-material";
import Styles from "./style/style.module.scss";
import MicIcon from "@mui/icons-material/Mic";
import CallIcon from "@mui/icons-material/Call";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import Peer from "simple-peer";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import styled from "styled-components";

const VideoNotification = ({
  recieverChat,
  user,
  handleClickOpen,
  receivedCall,
  callAccepted,
  reeivingCall,
  callEnded,
  answerCall,
  call,
  name,
  callUser,
  stream,
  idToCall,
  caller,
  signal,
  me,
  leaveCall,
  userVideo,
  myVideoRef,
  userVideoRef,
}) => {
  return (
    <>
      {reeivingCall && !callAccepted && (
        <div
          style={{
            position: "absolute",
            left: "30%",
            top: "50%",
            width: "350px",
            // height: "300px",
            display: "flex",
            transform: "translate(-50% -50%)",
            flexDirection: "column",
            zIndex: 9999,
            backgroundColor: "#3f2248",
            padding: "20px",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              p={2}
              sx={{ color: "#fff" }}
            >
              {name} is calling:
            </Typography>
            <Button color="primary">
              <IconButton
                sx={{ background: "green", color: "#fff" }}
                onClick={answerCall}
                disableFocusRipple
                disableTouchRipple
              >
                <CallIcon />
              </IconButton>
              <IconButton
                onClick={() => leaveCall()}
                sx={{ background: "red", color: "#fff", marginLeft: "3rem" }}
              >
                <PhoneDisabled />
              </IconButton>
            </Button>
          </div>
        </div>
      )}
      {callAccepted && !callEnded ? (
        <div
          style={{
            position: "absolute",
            left: "20%",
            top: "50%",
            width: "500px",
            height: "300px",
            display: "flex",
            transform: "translate(-50% -50%)",
            flexDirection: "column",
            zIndex: 9999,
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: 10,
          }}
        >
          <video
            playInline
            muted
            ref={userVideoRef}
            style={{ width: "200px", border: "2px solid red" }}
          />
          <video
            playInline
            muted
            ref={myVideoRef}
            style={{ width: "200px", border: "2px solid red" }}
          />
          <Button onClick={leaveCall}>call Ended</Button>
        </div>
      ) : null}
    </>
  );
};

export default VideoNotification;
