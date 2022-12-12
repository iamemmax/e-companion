import { Badge, Grid, IconButton } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import MessageIcon from "@mui/icons-material/Message";
import { FaShare } from "react-icons/fa";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const ActivityFooter = ({ post }) => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  return (
    <Grid container spacing={4} justifyContent={"space-between"}>
      <Grid item xs={4}>
        <IconButton>
          <StyledBadge
            badgeContent={post?.likes?.length > 0 ? post?.likes?.length : "0"}
            color="secondary"
          >
            <ThumbUpOutlinedIcon size="small" />
          </StyledBadge>
        </IconButton>
        <span style={{ fontSize: 12, marginLeft: 10 }}>Likes</span>
      </Grid>
      <Grid item xs={4}>
        <IconButton>
          <StyledBadge
            badgeContent={
              post?.comment?.length > 0 ? post?.comment?.length : "0"
            }
            color="secondary"
          >
            <MessageIcon size="small" />
          </StyledBadge>
        </IconButton>
        <span>
          {" "}
          <span style={{ fontSize: 12, marginLeft: 10 }}>Comments</span>
        </span>
      </Grid>
      <Grid item xs={4}>
        <IconButton>
          <FaShare />
        </IconButton>
        <span>
          {" "}
          <span style={{ fontSize: 12, marginLeft: 2 }}>Shares</span>
        </span>
      </Grid>
    </Grid>
  );
};

export default ActivityFooter;
