import { Button, Grid, Typography, Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import baseUrl from "../../components/config/Axios";
import Loading from "../../components/config/Loader";
import Header from "../../components/custom/Header";
import AdvertLayout from "../../components/layouts/AdvertLayout";
import DashboardLayout from "../../components/layouts/DashboardLayout";
// import DashboadHeader from "../../components/users/Dashboard/DashboadHeader";
// import Styles from "../../components/users/dashboard/styles/dashboadHeader.module.scss";
import {
  followUser,
  unfollowUser,
} from "../../features/slice/users/LoginSlice";

const Friend = () => {
  // const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]); 
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllfriend = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/users`);
        if (data) {
          setFriends(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getAllfriend();
  }, []);

  if (loading) {
    return <Loading />;
  }
console.log(user?.data?.user?.followers.map(x => x?._id))
  const handleFollowUser = async (id) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/users/follow/${id}/${user?.data?.user?._id}`
      );
      if (data) {
        setLoading(false);
        console.log(data?.isFollow);
        dispatch(followUser(data?.isFollow));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUnFollowUser = async (id) => {
    console.log(id)
    try {
      const { data } = await axios.put(`${baseUrl}/users/unfollow/${id}/${user?.data?.user?._id}`);
      if (data) {
        dispatch(unfollowUser(data?.isUnFollow));
        setLoading(false);
      
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const myfrinds = friends?.filter((friend) => friend?._id !== user?.data?.user?._id)
  return (
    <>
      <DashboardLayout>
        <AdvertLayout>
           <Typography variant="h5" p={3} align="center">
          {" "}
          Add new Friend
        </Typography>
        <Grid container p={5}>
          <br />
          {myfrinds?.map((friend) => (
      

            <Grid container spacing={2} pb={4} key={friend?._id}>
              <Grid item xs={3}>
                {" "}
                <Avatar
                  alt="Remy Sharp"
                  src={friend?.avater?.filename}
                  sx={{ width: 40, height: 40 }}
                />
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body2">{friend?.username}</Typography>
              </Grid>
              <Grid item xs={3}>
                {user?.data?.user?.followers.find(x => x?._id === friend._id) ? (
                  <Button
                    variant="outlined"
                    onClick={() => handleUnFollowUser(friend?._id)}
                  >
                   {loading? "..." :"unFollow"}
                  </Button>
                  
                  
                ): (
                    
                <Button
                  variant="outlined"
                  onClick={() => handleFollowUser(friend?._id)}
                >
                  follow
                </Button>
                
                )
              }
              </Grid>
              <br />
            </Grid>
          ))}
        </Grid>
       </AdvertLayout>
      </DashboardLayout>
    </>
  );
};

export default Friend;
