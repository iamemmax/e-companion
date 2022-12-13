import React from "react";
import Styles from "./styles/member.module.scss";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import baseUrl from "../config/Axios";
import { useRouter } from "next/router";
function Members() {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const [locationFriend, setLoacationFriend] = useState([]);
  const [loading, setLoding] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const friend = user?.data?.user;

  const Router = useRouter();
  useEffect(() => {
    const getMembers = async () => {
      setLoding(true);
      try {
        const { data } = await axios.get(
          `${baseUrl}/users/?country=${friend?.country}&state=${friend?.state}&city=${friend?.city}`
        );
        console.log(data);
        if (data) {
          setLoding(false);
          setLoacationFriend(data?.data);
        }
      } catch (error) {
        setLoding(false);
        console.log(error.message);
      }
    };
    getMembers();
  }, [friend]);
  return (
    <div className={Styles.wrapper}>
      {locationFriend?.length > 0 && (
        <div className={Styles.member__header}>
          <h3>Meet New People TodaY!</h3>
          <h2>New Memebers in Your City</h2>
        </div>
      )}
      <div className={Styles.img__list}>
        {/* {
          <ImageList className={Styles.img_container}>
            <ImageListItem
              key="Subheader"
              cols={matchDownMd ? 2 : 5}
            ></ImageListItem> */}
        <Grid
          container
          spacing={5}
          style={{ position: "relative", overflow: "hidden" }}
        >
          {loading
            ? "Loading"
            : locationFriend?.map((item, index) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  style={{
                    height: "250px",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid #eee",
                    // padding: "3px",
                  }}
                  key={item?.id}
                  onClick={() => Router.push(`/users/followers/${item?._id}`)}
                >
                  <img src={item?.avater?.filename} />
                  <div className={Styles.memberInfo}>
                    <h2>{item?.username}</h2>
                    <p>{item?.city}</p>
                    <span>{item?.age} years</span>
                  </div>
                </Grid>
              ))}
        </Grid>
        <div className={Styles.seemore}>
          {/* <Button
            fullWidth
            size="large"
            style={{ backgroundColor: "#FC2A4D" }}
            variant="contained"
          >
            {/* See All */}
          {/* </Button> */}
        </div>
      </div>
    </div>
  );
}

export default Members;
