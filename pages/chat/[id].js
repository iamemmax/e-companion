import React, { useCallback, useEffect, useRef, useState } from "react";
import ChatLayout from "../../components/layouts/ChatLayout";
import Router, { useRouter } from "next/router";
import ChatBox from "../../components/chat/ChatBox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "../../components/chat/ChatHeader";
import { io } from "socket.io-client";
import { Button, IconButton, Input, Stack } from "@mui/material";
import InputEmoji from "react-input-emoji";
import SendIcon from "@mui/icons-material/Send";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import baseUrl from "../../components/config/Axios";
import RecentChat from "../../components/chat/RecentChat";
import { getChats, userChat } from "../../features/slice/chat/getChat";
import { createRecentChat } from "../../features/slice/users/LoginSlice";
import Followers from "../../components/chat/Followers";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import OutsideClickHandler from 'react-outside-click-handler';
import Lottie from "lottie-react";
import TypingAnimation from "../../components/animation/typing.json"
import baseUrlUpload from "../../components/config/AxiosUpload";

const ChatId = () => {
  // const { id } = Router.params
  const { user } = useSelector((state) => state.auth);
  const { isLoading, messages } = useSelector(state => state.chat)
  const [doReload, setDoReload] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [notification, setNotification] = useState([]);
  const [sendMessage, setSendMessage] = useState([]);
  const [recieverChat, setRecieverChat] = useState({});
  const [online, setOnline] = useState({});
  // const [chat, setChat] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [recentChat, setRecentChat] = useState(false);
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stopTyping, setStopTyping] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const [imgPreviewError, setImgPreviewError] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null)

  const router = useRouter();
  const { id } = router.query;
  const userId = user?.data?.user?._id;
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const [chatId, setChatId] = useState(id);
  const { chats } = useSelector((state) => state?.chat);
  // const [socket, setSocket] = useState(null)
  const socket = useRef()
  useEffect(() => {
    socket.current = io("https://e-companion.onrender.com")
    // socket.current = io("https://companion-api.vercel.app")
    socket.current.on("message-received", (data) => {
      if(data.senderId === userId) return
      setArrivalMessage(data)
      console.log(data)
    })
  }, [])
  useEffect(() => {
    socket.current.emit("addUser", user?.data?.user)
    socket.current.on("onlineUser", (data) => {
      setOnline(data);
    })
    socket.current.on("typing", () => setTyping(true));
    socket.current.on("stop typing", () => setTyping(false));
  }, [socket, user?.data?.user])
 

  //initialize socket
  let seletectedChatCompare;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChats(user?.data?.user._id));
  }, [user, dispatch]);
  seletectedChatCompare = chatId
  const onlineUser = chats?.userChat;

  // fetch chat messages
  
 
  


 
  
  const getChatPatner = useCallback(async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/chat/find/${id}`);
      let pp = data?.data?.members.find((x) => x?._id !== user?.data?.user?._id);
      socket.current.emit("patnerId",userId);
      
      setRecieverChat(pp);
    } catch (error) {
      console.log(error)
    }
    // console.log(pp);
  })
  useEffect(() => {
    getChatPatner();
  }, [id]);

  useEffect(() => {
    const getUserChats = async () => {
      try {

        const { data } = await axios.get(`${baseUrl}/chat/message/${id}`)
        if (data) {
          setLoading(false)
          setChatMessages(data?.chat);
          
          socket.current.emit("joinChat", id);
          dispatch(userChat(data?.chat))
        }
      } catch (error) {
        setLoading(false)
   
        console.log(error);
      }
    }
 


    getUserChats();

  }, [id]);


  // const handleText = (e) => {
  //   setText(e.target.value)
   
  if (typing && text?.length > 0) {
        
    socket.current.emit("typing", chatId)

    let lastTyping = new Date().getTime()
    let timerLength = 3000
    setTimeout(() => {
      let timeNow = new Date().getTime()

      let timeDiff = timeNow - lastTyping

      if (timeDiff >= timerLength && typing) {
        // socket.current.emit("stop typing", chatId)
        setTyping(false)
      }
    }, timerLength);
  }

  //  }

  // handle

  // handle upload img'
  // voice or audio recording
  // const recorderControls = useAudioRecorder();
  // const addAudioElement = async (blob) => {
  //   const url = URL.createObjectURL(blob);
   
  //   const dataAudioInfo = {
  //     audio: url,
  //     chatId,
  //     senderId: user?.data?.user?._id,
  //     receiverId: recieverChat?._id,
  //   }
  //   try {
  //     const { data } = await axios.post(`${baseUrl}/chat/audio`, dataAudioInfo)
  //     console.log(data)
  //     //  let userChatMsg = {
  //     //   data: data?.chat,
  //     //   id: user?.data?.user?._id,
  //     // };
  //     socket.current.emit("send-message", data?.chat);
  //     setChatMessages([...chatMessages, dataAudioInfo]);
  //     if (data?.chat) {
  //       setDoReload(true)
  //     }
     
  //   } catch (err) {
  //     console.log(err.message)
  //     console.log(err.message)
  //   }
  // }
  

  




  const dataInfo = {
    text,
    chatId,
    senderId: user?.data?.user?._id,
    receiverId: recieverChat?._id,
  };

  const handleSubmit = async (e) => {
    // if (e.key === "Enter" && text) {
    try {
        
      socket.current.emit("stop typing", chatId)
      setText("");
      const { data } = await axios.post(`${baseUrl}/chat/message`, dataInfo);
      socket.current.emit("send-message", data?.chat);
     
       setChatMessages((prev) =>[...prev,  dataInfo]);
    
      setDoReload(true);
    } catch (err) {
      console.log(err);
    }
    //  }
  };
 
  // send Img
  const handleImgUpload = async (e) => {

    setImg(e?.target.files[0]);

  
    try {
      const formData = new FormData();
      formData.append("file", e?.target.files[0]);
      formData.append("chatId", chatId);
      formData.append("senderId", user?.data?.user?._id);
      formData.append("receiverId", recieverChat?._id);

      const { data } = await axios.post(`${baseUrlUpload}/chat/img`, formData);
      socket.current.emit("send-message", data?.chat);
      setChatMessages((prev) => [...prev, data?.chat]);

      console.log(data)
      console.log(e.target.files[0])
      // let userChatMsg = {
      //   data: data?.chat,
      //   id: user?.data?.user?._id,
      // };
      setDoReload(true);
    } catch (err) {
      console.log(err.message);
    }
      
    

  };


  useEffect(() => {
    
    
    if (arrivalMessage) {
      if (id !== arrivalMessage?.chatId) {
        //notification 
      } else {
         setChatMessages((prev) => [...prev, arrivalMessage]);
      }
    }
    
  
  }, [arrivalMessage,]);


  return (
    <div className="chats__container__wrappers">
      <div className="chats__container__middle_wrappers">
        

        <div
          className={
            recentChat
            ? "chats__container__recent showRecentChat"
            : "chats__container__recent"
          }
          >
          {" "}
          <OutsideClickHandler
      onOutsideClick={() => {
       setRecentChat(false)
      }}
      >
          <RecentChat
            currentUserId={userId}
            online={online}
            onlineUser={onlineUser}
            notification={notification}
            />
            </OutsideClickHandler>
        </div>
        <div className="chats__container__main">
          <div className="chats__container__header">
            <ChatHeader
              setRecentChat={setRecentChat}
              recieverChat={recieverChat}
            />
          </div>
          <div className="chats__container__chatBox">
            <div className="chats__container__chatBox_message">
              {loading ? "loading chat messages ..." : chatMessages?.map((chat, index) => (
                <ChatBox
                  chat={chat}
                  userId={userId}
                  key={index}
                  doReload={doReload}
                  chatMessages={chatMessages}
                  
                />
              ))}
            </div>
            <div className="chats__container__input">
              {/* <Stack direction="row" alignItems="center" spacing={2}> */}
                {typing && <> <Lottie animationData={TypingAnimation} loop={true} /></>} <br/>


               <IconButton
            aria-label="upload picture"
            component="label"
            disableRipple
            disableFocusRipple
         
          >
            <input hidden accept="image/*" type="file" onChange={handleImgUpload} />
         <AttachFileOutlinedIcon /> 
           
          </IconButton>
                        

                {/* <AudioRecorder
                    onRecordingComplete={(blob) => addAudioElement(blob)}
                    recorderControls={recorderControls}
                /> */}
                
                <InputEmoji
                  value={text}
                  onChange={setText}
                  cleanOnEnter
                  onEnter={handleSubmit}
                  placeholder="Type a message"
                />
                {/* <input type={text} value={text} onChange={handleText}/> */}

                <LoadingButton
                  size="small"
                  onClick={handleSubmit}
                  type="submit"
                  endIcon={<SendIcon />}
                  disabled={!text}
                  // loading={loading}
                  loadingPosition="end"
                  variant="contained"
                >
                  Send
                </LoadingButton>
              {/* </Stack> */}
            </div>
          </div>
        </div>

        <div className="follower__box">
          <Followers />
        </div>
      </div>
    </div>
  );
};

export default ChatId;
