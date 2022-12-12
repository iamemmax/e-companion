import {
  Button,
  Container,
  TextField,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import React, { useState, useContext } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";
// import { SocketContext } from "../../SocketContext";
// import "./Options.css";

const Options = ({
  me,
  callAccepted,
  Name,
  setName,
  callEnded,
  leaveCall,
  callUser,
  patnerId,
  recieverChat,
}) => {
  //   const { me, callAccepted, Name, setName, callEnded, leaveCall, callUser } =
  //     useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  console.log(patnerId);

  return <Container className="container"></Container>;
};

export default Options;
