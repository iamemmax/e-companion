import React, { useState } from "react";
import Authlayout from "../../components/layouts/Authlayout";
import {
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import Styles from "../../components/auth/styles/authcomp.module.scss";
import Link from "next/link";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import router from "next/router";
import Loading from "../../components/config/Loader";
import axios from "axios";
import baseUrl from "../../components/config/Axios";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import { ForgetPasswordSchema } from "../../components/validation/createUsersSchema";

function ForgetPassword() {
  const dispatch = useDispatch();
const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgetPasswordSchema,

    onSubmit: async ({ email }) => {
      try {
        setLoading(true)
        const { data } = await axios.get(
          `${baseUrl}/users/forget-password?email=${email}`);
        console.log(data);
        setLoading(false)
        if (data) {
           swal.fire({
      // title: data.msg,
      text: data?.msg,
      icon: "success",
      // button:close
    });
        }
      } catch (error) {
          setLoading(false)
        console.log(error.message);
      }
    },
  });
  const { values, errors, handleChange, touched, handleSubmit } = formik;
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     console.log(email);
  //     // dispatch(forgetPasswordReducer(email));

  //   };
  console.log(values.email);
  return (
    <Authlayout>
      <div className={Styles.inputWrapper}>
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            align="center"
            p={2}
            component="h2"
            alignItems="center"
          >
            FORGET PASSWORD
          </Typography>

          <div>
            <TextField
              fullWidth
              variant="outlined"
              onChange={handleChange}
              value={values.email}
              label="email"
              name="email"
              type="email"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </div>
          <br />

          <Button fullWidth size="large" variant="contained" type="submit">
           {loading ? <CircularProgress size="14px"/> : "Forget Password"}
          </Button>
        </form>
      </div>
    </Authlayout>
  );
}

export default ForgetPassword;
