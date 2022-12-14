import React from "react";
import { Button, Grid, Avatar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AdvertLayout from "../../../layouts/AdvertLayout";
const Following = ({ loading, friends }) => {
  const { user } = useSelector((state) => state.auth);
  const currentUser = user?.data?.user;
  console.log(currentUser._id);
  return (
    <AdvertLayout>
      {loading
        ? "loading"
        : friends?.following?.map((x) => (
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
                <Typography variant="body2">{x?.username}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined" size="small">
                  follow
                </Button>
              </Grid>
              <br />
            </Grid>
          ))}
    </AdvertLayout>
  );
};

export default Following;
