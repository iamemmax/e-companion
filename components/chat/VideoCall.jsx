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
  TextField,
  IconButton,
  Stack,
  Paper,
  Typography,
} from "@mui/material";
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";
import StopIcon from "@mui/icons-material/Stop";
import CallEndIcon from "@mui/icons-material/CallEnd";
import Styles from "./styles/video.module.scss";
import MicIcon from "@mui/icons-material/Mic";
import CallIcon from "@mui/icons-material/Call";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import baseUrl from "../config/Axios";
import Peer from "simple-peer";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import styled from "styled-components";
import VideoNotification from "./Notification/VideoNotification";
import Options from "./option/Option";

export default function VideoCall({
  open,
  setOpen,
  recieverChat,
  user,
  handleClickOpen,
  reeivingCall,
  callUser,
  callAccepted,
  callEnded,
  stream,
  myVideoRef,
  userVideoRef,
  name,
  leaveCall,
  me,
  idToCall,
  setName,
  setIdToCall,
  patnerId,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {(me, "me")}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={Styles.wrapper}>
          <Grid container className="gridContainer">
            <Grid item>
              {stream && (
                <video
                  playInline
                  muted
                  ref={myVideoRef}
                  style={{ width: "200px", border: "2px solid red" }}
                  autoPlay
                />
              )}
            </Grid>

            <Grid item>
              {callAccepted && !callEnded ? (
                <video
                  playInline
                  muted
                  ref={userVideoRef}
                  style={{ width: "200px", border: "2px solid red" }}
                />
              ) : null}
            </Grid>

            <TextField
              value={name}
              onChange={(e) => setName(recieverChat?.username)}
              label="Name"
              variant="outlined"
            />
            <TextField
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              label="id to call"
              variant="outlined"
            />

            <Grid item xs={12} align="center">
              {callAccepted && !callEnded ? (
                <IconButton>
                  {" "}
                  <Button onClick={leaveCall}>
                    <PhoneDisabled />{" "}
                  </Button>
                </IconButton>
              ) : (
                <IconButton>
                  <Button onClick={() => callUser(idToCall)}>
                    <CallEndIcon />
                  </Button>
                </IconButton>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
// const Container = styled.div`
//   height: 100vh;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// `;

// const Row = styled.div`
//   display: flex;
//   width: 100%;
// `;

// const Video = styled.video`
//   border: 1px solid blue;
//   width: 50%;
//   height: 50%;
// `;
