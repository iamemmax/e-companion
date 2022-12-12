import React, { useState } from "react";
import { TextField, Grid, Button, Typography } from "@mui/material";
import Styles from "./styles/authcomp.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../features/slice/users/LoginSlice";
import { LoadingButton } from "@mui/lab";

function ComfirmPage({ next, prev }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const goback = (e) => {
    e.preventDefault();
    e.stopPropagation();

    prev();
  };
  const { userInfo, userBio, userPass, userAddress, isLoading } = useSelector(
    (state) => state.users
  );

  let { firstname, lastname, username } = userInfo;
  let { country, state, city } = userAddress;
  let { email, phone, date_of_birth } = userBio;
  let { password, password2, gender } = userPass;

  let data = {
    firstname,
    lastname,
    username,
    email,
    phone,
    date_of_birth,
    country,
    state,
    city,
    gender,
    password,
  };
  const submitUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(RegisterUser(data));
    setLoading(false);
  };
  return (
    <div className={Styles.inputWrapper}>
      <div>
        <h2>Please Confirm your details</h2>
        <h5>FirstName : {firstname}</h5>
        <h5>Lastname : {lastname}</h5>
        <h5>username : {username}</h5>
        <h5>Email : {email}</h5>
        <h5>Phone : {phone && phone}</h5>

        <h5>date_of_birth: {date_of_birth && date_of_birth}</h5>
        <h5>Gender: {gender && gender}</h5>
        <h5>State: {state && state}</h5>
        <h5>Address: {city && city}</h5>
        <h5>Password : {password}</h5>
        <h5>Confirm Password : {password2}</h5>
      </div>

      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              type="submit"
              onClick={goback}
            >
              Prev
            </Button>
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              size="medium"
              loading={isLoading}
              loadingPosition="end"
              variant="contained"
              fullWidth
              onClick={submitUser}
            >
              Confirm
            </LoadingButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ComfirmPage;
