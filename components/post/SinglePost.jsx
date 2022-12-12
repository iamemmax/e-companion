import { Typography } from "@mui/material";
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import Styles from "./styles/postMessages.module.scss";
import AddComment from "./comment/AddComment";
import { Waypoint } from "react-waypoint";
function SinglePost({ post }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log("222");
  };
  let [shouldPlay, updatePlayState] = useState(false);

  let handleEnterViewport = function () {
    updatePlayState(true);
  };
  let handleExitViewport = function () {
    updatePlayState(false);
  };
  return (
    <div className={Styles.wrapper2}>
      <div>
        <div className={Styles.commentIcon}>
          <IconButton aria-label="settings" onClick={handleOpen}>
            <MessageIcon sx={{ color: "#fff" }} />
          </IconButton>
        </div>
        <div>
          {post?.img?.length === 1 && (
            <div className={Styles.post_img_wrapper_1}>
              {post?.img?.slice(0, 1).map((item) => (
                <div key={item?.img} className={Styles.post_img_list_1}>
                  <img
                    src={item?.img}
                    srcSet={item?.img}
                    alt={item?.Image}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {post?.img?.length === 3 && (
            <div className={Styles.post_img_wrapper_3}>
              {post?.img?.slice(0, 3).map((item) => (
                <div key={item?.img} className={Styles.post_img_list_3}>
                  <img
                    src={item?.img}
                    srcSet={item?.img}
                    alt={item?.Image}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {post?.img?.length === 2 && (
            <div className={Styles.post_img_wrapper_2}>
              {post?.img?.slice(0, 2).map((item) => (
                <div key={item?.img} className={Styles.post_img_list_2}>
                  <img
                    src={item?.img}
                    srcSet={item?.img}
                    alt={item?.Image}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {post?.img?.length > 4 && (
            <>
              <div className={Styles.post_img_wrapper_4}>
                {post?.img?.slice(0, 4).map((item) => (
                  <div key={item?.img} className={Styles.post_img_list_4}>
                    <img
                      src={item?.img}
                      srcSet={item?.img}
                      alt={item?.Image}
                      loading="lazy"
                    />
                    <div className={Styles.totalImage}>
                      <Typography>+{post?.img?.length - 4}</Typography>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {post?.video && (
            <div className={Styles.videoBox}>
              {post?.video?.map((x, index) => (
                <Waypoint
                  onEnter={handleEnterViewport}
                  onLeave={handleExitViewport}
                >
                  <video
                    src={x?.video}
                    key={x?._video_id}
                    autoPlay={shouldPlay}
                    controls
                    className="video__player"
                    loop

                    // playingS
                  />
                </Waypoint>
              ))}
            </div>
          )}
        </div>
        <Typography
          variant="subtitle2"
          sx={{
            lineHeight: "30px",
            textAlign: "justify",
            fontWeight: "400",
            padding: "10px",
          }}
        >
          {" "}
          {post?.description}
        </Typography>
      </div>
      <AddComment setOpen={setOpen} open={open} post={post} />
    </div>
  );
}

export default SinglePost;
