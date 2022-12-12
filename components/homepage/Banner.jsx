import React, { useState } from "react";
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
import FindLove from "./FindLove";
function Banner() {
  const [input, setInput] = useState({
    myGender: "",
    lookingFrom: "",
    ageFrom: "",
    ageTo: "",
    city: "",
  });
  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const { myGender, ageTo, lookingFrom, ageFrom, city } = input;
  console.log(myGender, ageTo, lookingFrom, ageFrom, city);
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className={Styles.wrapper}>
      <Grid container>
        <Grid item sm={12} md={6}>
          <div className={Styles.textBox}>
            <div className={Styles.textTitle}>
              <h2>Introducing Edate</h2>
            </div>
            <div className={Styles.bannertDesc}>
              <p>
                Serious Dating With Edate Your Perfect Match isJust a Click
                Away.
              </p>
            </div>
            <div className={Styles.form}>
              <FindLove />
            </div>
          </div>
        </Grid>
        <Grid item sm={12} md={6} className={Styles.bannerRight}>
          {" "}
        </Grid>
      </Grid>
    </div>
  );
}

export default Banner;
