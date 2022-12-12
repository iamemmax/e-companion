import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MessageIcon from "@mui/icons-material/Message";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { format } from "timeago.js";
import Styles from "../../../post/styles/postMessages.module.scss";
import Link from "next/link";
import { FaShare } from "react-icons/fa";

const FollowersPost = ({ followerPost, loading }) => {
  return (
    <div>
      {loading ? (
        "loading"
      ) : followerPost?.length <= 0 ? (
        <p> no post found</p>
      ) : (
        followerPost?.map((post) => (
          <Link href={`/post/${post?._id}`} key={post?._id}>
            <Card
              sx={{ maxWidth: "100%", marginBottom: "1rem" }}
              key={post?._id}
            >
              <CardHeader
                avatar={
                  <Avatar
                    alt={post?.author?.username}
                    src={post?.author?.avater?.filename}
                  />
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={
                  <span style={{ marginRight: "10px" }}>
                    {post?.author?.username}
                  </span>
                }
                subheader={format(post?.author?.createdAt)}
              />
              <CardMedia>
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

                {post?.img.length === 3 && (
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

                {post?.img.length === 2 && (
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

                {post?.img?.length > 3 && (
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
              </CardMedia>

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post?.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between" }}>
                <IconButton aria-label="add to favorites">
                  <ThumbUpIcon /> {post?.likes?.length}
                </IconButton>
                <IconButton aria-label="share">
                  <MessageIcon />
                  {post?.comments?.length}
                </IconButton>
                <IconButton aria-label="share">
                  <FaShare />
                </IconButton>
              </CardActions>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};

export default FollowersPost;
