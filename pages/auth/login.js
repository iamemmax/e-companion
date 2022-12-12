import React, { useEffect } from "react";
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
import { LoginUserSchema } from "../../components/validation/createUsersSchema";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser, reset } from "../../features/slice/users/LoginSlice";
import router from "next/router";
import Loading from "../../components/config/Loader";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { LoadingButton } from '@mui/lab';
import Head from "next/head";

// import LoadingButton from "@mui/lab/LoadingButton";

function Login() {
  const dispatch = useDispatch();
  // const [cookie, setCookie] = useCookies(["token"]);

  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    setTimeout(() => {
      dispatch(reset());
    }, 2000);
  }, [dispatch, message, user, isSuccess]);

  if (isLoading) {
    <Loading />;
  }



  if (isSuccess) {
    Cookies.set("token", user?.data.userToken);
    router.push("/");
    toast.success(user.msg, {
      toastId: "success",
      position: "top-right",
    });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginUserSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(LoginUser(values));
    },
  });

  const {
    values: { email, password },
    errors,
    handleChange,
    handleSubmit,
    touched,
  } = formik;

  if (isError && message) {
    toast.error(message, {
      toastId: "error1",
      position: "top-right",
    });
  }
  return (
    <Authlayout>
       <Head>
        <title>Login to E-companion</title>
      </Head>
      <div className={Styles.inputWrapper}>
        <form onSubmit={handleSubmit}>
          {/* {message && <p>{message}</p>} */}
          <Typography
            variant="h5"
            align="center"
            p={3}
            component="h2"
            alignItems="center"
          >
            LOGIN ACCOUNT
          </Typography>

          <div>
            <TextField
              fullWidth
              variant="outlined"
              onChange={handleChange}
              value={email}
              label="email"
              name="email"
              type="email"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </div>
          <br />
          <div>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              onChange={handleChange}
              value={password}
              password={password}
              name="password"
              type="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
          </div>
          <br />
          {/* <Button fullWidth size="large" variant="contained" type="submit">
            {isLoading ? <CircularProgress size='25px' color="secondary" /> : "Login"}
          </Button> */}
           <LoadingButton
          size="medium"
         
          loading={isLoading}
          loadingPosition="end"
            variant="contained"
            fullWidth
            type="submit"
        >
          Login
        </LoadingButton>
        </form>
        <br />
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={6}>
            <Link href="/auth/forget-password">
            Forget Password
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link href="/auth/register">
            Not yet a member
            </Link>
          </Grid>
        </Grid>
      </div>
    </Authlayout>
  );
}

export default Login;
