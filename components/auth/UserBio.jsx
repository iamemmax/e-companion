import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import Styles from "./styles/authcomp.module.scss";
import { useFormik } from "formik";
import { validateBio } from "../validation/createUsersSchema";
import { useDispatch, useSelector } from "react-redux";
import { savedUserBio } from "../../features/slice/auth/MyUserSlices";
import MuiPhoneNumber from "material-ui-phone-number";

function UserBio({ next, prev }) {
  const dispatch = useDispatch();
  const { userBio } = useSelector((state) => state.users);

  const goback = (e) => {
    e.preventDefault();
    e.stopPropagation();

    prev();
  };
  let { email, phone, date_of_birth } = userBio;

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      date_of_birth: "",
    },
    validationSchema: validateBio,

    onSubmit: ({ email, phone, date_of_birth }) => {
      dispatch(savedUserBio({ email, phone, date_of_birth }));
      next();
    },
  });
  const { values, errors, handleChange, touched, handleSubmit, setValues } =
    formik;
  useEffect(() => {
    setValues({ email, phone, date_of_birth });
    console.log(phone);
  }, []);

  return (
    <div className={Styles.inputWrapper}>
      <form onSubmit={handleSubmit} method="post">
        <div>
          <TextField
            id="outlined-basic"
            fullWidth
            onChange={handleChange}
            value={values.email}
            variant="outlined"
            label="email"
            name="email"
            type="text"
            helperText={touched?.email && errors?.email}
            error={touched?.email && errors?.email}
          />
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic"
            fullWidth
            onChange={handleChange}
            value={values.phone}
            variant="outlined"
            label="phone"
            name="phone"
            type="text"
            helperText={touched?.phone && errors?.phone}
            error={touched?.phone && errors?.phone}
          />
          <div>
            {/* <MuiPhoneNumber
              fullWidth
              defaultCountry={"us"}
              value={values.phone}
              name="phone"
              onChange={handleChange}
              helperText={touched?.phone && errors?.phone}
              error={touched?.phone && errors?.phone}
              variant="outlined"
              label="Phone Number"
              type="text"
              id="outlined-basic"
            /> */}
          </div>
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic"
            fullWidth
            onChange={handleChange}
            value={values.date_of_birth}
            variant="outlined"
            label="date of Birth"
            name="date_of_birth"
            type="date"
            helperText={touched?.date_of_birth && errors?.date_of_birth}
            error={touched?.date_of_birth && errors?.date_of_birth}
          />
        </div>
        <br />

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              type="submit"
              onClick={goback}
            >
              Prev
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              disabled={!(formik.isValid && formik.dirty)}
              fullWidth
              size="large"
              variant="contained"
              type="submit"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default UserBio;
