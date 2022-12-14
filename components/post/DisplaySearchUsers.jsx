import {
  CardActions,
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const DisplaySearchUsers = ({ people, loading, datas }) => {
  const { search } = useSelector((state) => state.posts);
  const Router = useRouter();
  if (loading) {
    return <p>loading .....</p>;
  }
  return (
    <div>
      {people?.length <= 0 ? (
        <p>{`${people?.length} result found for ${search || datas}`}</p>
      ) : (
        people?.map((x) => (
          <>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar
                    alt="Remy Sharp"
                    src={x?.avater?.filename}
                    sx={{ width: 40, height: 40 }}
                  />
                }
                title={x?.username}
                subheader={
                  <span style={{ fontSize: "12px", float: "right" }}>
                    {format(x?.createdAt)}
                  </span>
                }
              />
              <CardActions>
                {/* <Button size="sm all">Follow</Button> */}
                <Button
                  size="small"
                  onClick={() => Router.push(`/users/followers/${x?._id}`)}
                >
                  View Profile
                </Button>
              </CardActions>
            </Card>
          </>
        ))
      )}
    </div>
  );
};

export default DisplaySearchUsers;
