import React, { useEffect, useState, useCallback } from "react";
import FollowersProfileLayout from "../../../layouts/FollowersProfileLayout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../../config/Axios";
import { useDispatch } from "react-redux";
import {
  myfollowerProfile,
  reset,
} from "../../../../features/slice/users/LoginSlice";
import { fetchAllUserPosts } from "../../../../features/slice/post/postSlice";
import Followers from "./Followers";
import FollowersPost from "./FollowersPost";
import Following from "./Following";
import FollowerPhotos from "./FollowerPhotos";
import Profile from "./Profile";

const FollowerProfileContainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [followerPost, setFollowerspost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchFollowerProfile = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/users/${id}`);
        // console.log(data?.user)
        setLoading(false);
        setUser(data?.user);
        dispatch(myfollowerProfile(data?.user));
        dispatch(fetchAllUserPosts(id));
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchFollowerProfile();
    return () => {
      dispatch(reset());
    };
  }, [id, dispatch]);

  // fetch all users post
  const followersPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/posts/mypost/${id}`);
      setFollowerspost(data?.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  }, [id]);
  useEffect(() => {
    followersPost();
  }, [id]);

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <FollowersProfileLayout>
      <Box sx={{ width: "100%", typography: "body1", align: "center" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              // padding: "10px",
              textAlign: "center",
            }}
            align="center"
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              label="item"
            >
              <Tab label="Profile" value="1" />
              <Tab label="Post" value="2" />
              <Tab label="Photos" value="3" />
              <Tab label="Followers" value="4" />
              <Tab label="Following" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Profile user={user} loading={loading} />
          </TabPanel>
          <TabPanel value="2">
            <FollowersPost followerPost={followerPost} loading={loading} />
          </TabPanel>
          <TabPanel value="3">
            <FollowerPhotos followerPost={followerPost} loading={loading} />
          </TabPanel>
          <TabPanel value="4">
            <Followers loading={loading} friends={user} />
          </TabPanel>
          <TabPanel value="5">
            <Following loading={loading} friends={user} />
          </TabPanel>
        </TabContext>
      </Box>
    </FollowersProfileLayout>
  );
};

export default FollowerProfileContainer;
