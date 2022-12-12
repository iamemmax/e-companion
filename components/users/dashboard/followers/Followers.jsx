import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followFriendFollower,
  unfollowFriendFollower,
} from "../../../../features/slice/users/LoginSlice";
import baseUrl from "../../../config/Axios";
import { useRouter } from "next/router";
import { Button, Grid, Avatar, Typography } from "@mui/material";
const Followers = ({ loading, friends }) => {
  // const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const { followerProfile, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleFollowUser = async (friend_id) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/users/follow/${friend_id}/${id}`
      );
      if (data) {
        // setLoading(false);
        console.log(data?.isFollow);

        dispatch(followFriendFollower(id));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUnFollowUser = async (friend_id) => {
    console.log(id);
    try {
      const { data } = await axios.put(
        `${baseUrl}/users/unfollow/${friend_id}/${id}`
      );
      if (data) {
        dispatch(unfollowFriendFollower(id));
        // setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const currentUser = user?.data?.user;

  return (
    <div>
      {loading
        ? "loading"
        : friends?.followers?.map((x) => (
            <Grid container spacing={2} pb={4} key={x?._id}>
              <Grid item xs={3}>
                {" "}
                <Avatar
                  alt="Remy Sharp"
                  src={x?.avater?.filename}
                  sx={{ width: 40, height: 40 }}
                />
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body2">
                  {" "}
                  {currentUser?._id === x?._id ? "You" : x?.username}
                </Typography>
              </Grid>

              {/* <Grid item xs={3}>
                {currentUser?.followers.find((b) => b?._id === x?._id) ? (
                  <Button
                    variant="outlined"
                    onClick={() => handleUnFollowUser(x?._id)}
                  >
                    {loading ? "..." : "unFollow"}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => handleFollowUser(x?._id)}
                  >
                    follow
                  </Button>
                )}
              </Grid> */}
              <br />
            </Grid>
          ))}
    </div>
  );
};

export default Followers;
