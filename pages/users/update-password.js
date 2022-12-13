import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import { validateChangePassword } from "../../components/validation/createUsersSchema";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axios from "axios";
import baseUrl from "../../components/config/Axios";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loading from "../../components/config/Loader";
import { useDispatch, useSelector } from "react-redux";
const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { 
    isSuccess, user, message, isError
} = useSelector(
    (state) => state.auth
  );
  const users = user?.data?.user;
  const formik = useFormik({
    initialValues: {
      oldpassword: "",
      password: "",
      password2: "",
    },
    validationSchema: validateChangePassword,
    onSubmit: async ({ password, password2, oldpassword }) => {
      console.log(password, password2, oldpassword);
      try {
        setIsLoading(true);
        const { data } = await axios.put(`${baseUrl}/users/change-password/${users?._id}`, {
          oldpassword,
          password,
          password2,
        });
        console.log(data);
        if (data?.message) {
          toast.success(data?.message, {
            toastId: "success1",
          });
        }
        if (data?.msg) {
          console.log(data?.msg);
          toast.error(data?.msg, {
            toastId: "error1",
          });
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.msg, {
          toastId: "error1",
        });
        console.log(error.message);
      }
    },
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const { values, errors, handleChange, handleSubmit, touched } = formik;

  return (
    <DashboardLayout>
      <Typography variant="h5" component="h2" align="center" p={3}>
        Change Password
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid
          container
          justifyContent="center"
          spacing={5}
          p={5}
          alignItems="center"
        >
          <Grid item xs={12} md={8}>
            <div>
              <TextField
                variant="outlined"
                fullWidth
                type="password"
                label="Old Password"
                name="oldpassword"
                onChange={handleChange}
                helperText={touched?.oldpassword && errors?.oldpassword}
                error={touched?.oldpassword && errors?.oldpassword}
                value={values.oldpassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
          </Grid>
          <br />
          <Grid item xs={12} md={8}>
            <div>
              <TextField
                variant="outlined"
                fullWidth
                label="New Password"
                name="password"
                type="password"
                helperText={touched?.password && errors?.password}
                error={touched?.password && errors?.password}
                value={values.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
          </Grid>
          <br />
          <Grid item xs={12} md={8}>
            <div>
              <TextField
                variant="outlined"
                fullWidth
                label="Comfirm Password"
                name="password2"
                type="password"
                helperText={touched?.password2 && errors?.password2}
                error={touched?.password2 && errors?.password2}
                value={values.password2}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
          </Grid>

          <br />
          <Grid item xs={12} md={8}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
            >
              {isLoading ? "please Wait" : "Update"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

export default UpdatePassword;
