import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Styles from "./styles/banner.module.scss";
import ShowLove from "./ShowLove";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import baseUrl from "../config/Axios";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import { Country, State, City } from "country-state-city";

function FindLove() {
  const [open, setOpen] = useState(false);
  const [findLover, setFindLover] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    myGender: "",
    gender: "",
    from: null,
    to: null,
    country: "",
    state: "",
    city: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const { user } = useSelector((state) => state.auth);
  const { myGender, to, gender, from, country, state, city } = input;
  let number = [];

  let n = 0;
  while (n < 100) {
    n++;
    number.push(n);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // dispatch(findLove(input));

    try {
      setLoading(true);
      const { data } = await axios.get(
        `${baseUrl}/users/find-love?gender=${gender}&country=${country}&state=${state}&city=${city}&from=${from}&to=${to}`
      );
      setInput({
        myGender: "",
        gender: "",
        from: null,
        to: null,
        country: "",
        state: "",
        city: "",
      });
      setLoading(false);

      setFindLover(data?.data);
      setOpen(true);
    } catch (error) {
      setLoading(false);

      console.log(error.message);
    }
  };
  // const handleClickOpen = () => {
  // };

  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          <>
            <Grid
              item
              xs={4}
              md={3}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6" component="h6">
                I am:
              </Typography>
            </Grid>
            <Grid item xs={8} md={8}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={myGender}
                  label="Select myGender"
                  onChange={handleChange}
                  name="myGender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </>
          <br />
          <>
            <Grid
              item
              xs={4}
              md={3}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6" component="h6">
                Looking for:
              </Typography>
            </Grid>
            <Grid item xs={8} md={8}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Select myGender"
                  name="gender"
                  onChange={handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
              <br></br>
            </Grid>
          </>
          <div style={{ marginBottom: "10px" }}></div>
          <>
            <Grid
              item
              xs={4}
              md={3}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6" component="h6">
                Age:
              </Typography>
            </Grid>
            <Grid item xs={8} md={8}>
              <Grid
                container
                justifyContent="space-between"
                spacing={1}
                alignItems="center"
              >
                <Grid item xs={6} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">From</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={from}
                      type="number"
                      label="Select myGender"
                      onChange={handleChange}
                      name="from"
                    >
                      {number?.map((x, i) => (
                        <MenuItem value={x} key={i}>
                          {x}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">To</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={to}
                      label="Select myGender"
                      onChange={handleChange}
                      name="to"
                      type="number"
                    >
                      {number?.map((x, i) => (
                        <MenuItem value={x} key={i}>
                          {x}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </>

          {/*  */}
          <>
            <Grid
              item
              xs={4}
              md={3}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6" component="h6">
                Country
              </Typography>
            </Grid>
            <Grid item xs={8} md={8}>
              {/* <InputLabel id="demo-simple-select-label"></InputLabel> */}
              <TextField
                fullWidth
                id="outlined-basic"
                type="text"
                name="country"
                value={country}
                label="country"
                variant="outlined"
                onChange={handleChange}
                size="large"
              />
            </Grid>
          </>
          <>
            <Grid
              item
              xs={4}
              md={3}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6" component="h6">
                State
              </Typography>
            </Grid>
            <Grid item xs={8} md={8}>
              {/* <InputLabel id="demo-simple-select-label"></InputLabel> */}
              <TextField
                fullWidth
                id="outlined-basic"
                type="text"
                name="state"
                value={state}
                label="state"
                variant="outlined"
                onChange={handleChange}
                size="large"
              />
            </Grid>
          </>
          <>
            <Grid
              item
              xs={4}
              md={3}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6" component="h6">
                City
              </Typography>
            </Grid>
            <Grid item xs={8} md={8}>
              {/* <InputLabel id="demo-simple-select-label"></InputLabel> */}
              <TextField
                fullWidth
                id="outlined-basic"
                type="text"
                name="city"
                value={city}
                label="City"
                variant="outlined"
                onChange={handleChange}
                size="large"
              />
            </Grid>
          </>
          <>
            <Grid
              item
              xs={12}
              md={11}
              justifyContent="center"
              alignItems="center"
            >
              {user?.data?.user ? (
                <LoadingButton
                  size="medium"
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Find your partner
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  size="large"
                  style={{ backgroundColor: "#FC2A4D" }}
                  fullWidth
                  variant="contained"
                  onClick={() => router.push("/auth/login")}
                  sx={{ zIndex: 999 }}
                >
                  Login to find friend
                </Button>
              )}
            </Grid>
            <br />
            <br />
          </>
        </Grid>
      </form>

      <ShowLove
        open={open}
        setOpen={setOpen}
        findLover={findLover}
        loading={loading}
      />
    </>
  );
}

export default FindLove;
