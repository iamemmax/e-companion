import { Avatar, Typography, IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ShareIcon from "@mui/icons-material/Share";
import { format } from "timeago.js";
import MessageIcon from "@mui/icons-material/Message";
import Styles from "./styles/latestpost.search.module.scss";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const DisplaySearchPost = ({ latestPost, loading }) => {
  const [expanded, setExpanded] = React.useState(false);

  const { search } = useSelector((state) => state.posts);
  if (loading) {
    return <p>loading ...</p>;
  }
  return (
    <div className={Styles.lastestPost__wrapper}>
      {latestPost?.length === 0 ? (
        <p>{`${latestPost?.length} result found for ${search}`}</p>
      ) : (
        latestPost &&
        latestPost?.map((post) => (
          <div className={Styles.lastestPost} key={post?._id}>
            <Card
              sx={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    alt="Remy Sharp"
                    src={post?.userId?.avater?.filename}
                    sx={{ width: 40, height: 40 }}
                  />
                }
                title={post?.userId?.username}
                subheader={
                  <span style={{ fontSize: "12px", float: "right" }}>
                    {format(post?.createdAt)}
                  </span>
                }
              />
              <CardMedia
                component="img"
                height="194"
                image={post?.img[0]?.img}
                alt={"post image"}
              />
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {post?.description?.length > 80
                    ? post?.description?.slice(0, 80) + "..."
                    : post?.description}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{ marginTop: "-1rem", justifyContent: "space-between" }}
              >
                <IconButton
                  aria-label="add to favorites"
                  disableFocusRipple
                  disableRipple
                  size={"small"}
                >
                  <MessageIcon size={"small"} />
                  <span> {post?.comments?.length}</span>
                </IconButton>
                <IconButton aria-label="share" size={"10px"}>
                  <ThumbUpOutlinedIcon />
                  <span> {post?.likes?.length}</span>
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                  <span> 0</span>
                </IconButton>
              </CardActions>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

export default DisplaySearchPost;
