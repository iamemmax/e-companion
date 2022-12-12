import React, { useState, useEffect } from "react";
import { TextField, Grid, Button, Typography } from "@mui/material";
import Authlayout from "../../../components/layouts/Authlayout";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
// import { reactCodeInput } from 'CodeInputField.scss'
import dynamic from "next/dynamic";
import { LoadingButton } from "@mui/lab";
import router from "next/router";
import { reset, VerifyUser } from "../../../features/slice/users/LoginSlice";
import Loading from "./../../../components/config/Loader";
import { toast } from "react-toastify";
import swal from "sweetalert2";
const ReactCodeInput = dynamic(import("react-code-input"));

function Verification() {
  const { isLoading, isError, user, isSuccess, message } = useSelector(
    (state) => state?.auth
  );

  const data = user?.data
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  // const { id } = router.params
  useEffect(() => {
    setTimeout(() => {
      dispatch(reset());
    }, 3000);
  }, [message, isError]);

  const handleChange = (pin) => {
    setToken(pin);
  };
  let sendToken = {
    token,
    id: data?.saveUser?._id,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(VerifyUser(sendToken));
  };

  if (isLoading) {
    <Loading />;
  }
  useEffect(() => {
    setTimeout(() => {
      dispatch(reset());
    }, 3000);
  }, [message, isError]);

  if (isSuccess && user?.data?.user?.verified === true) {
    console.log(user?.msg);
    swal.fire({
      // title: user?.msg,
      text: user?.msg,
      icon: "success",
      // button:close
    });
    router.push("/users/friend");
  }

  if (isError && message) {
    toast.error(message, {
      toastId: "error1",
      position: "top-left",
    });
  }

  const props = {
    // className: reactCodeInput,
    inputStyle: {
      fontFamily: "Helonik-Regular",
      margin: "6px",
      width: "42px",
      height: "42px",
      padding: "8px 16px",
      borderRadius: "6px",
      fontSize: "16px",
      textAlign: "center",
      color: "#4A476F",
      backgroundColor: "#FFFFFF",
      border: "1px solid #DEDBFA ",
    },
    inputStyleInvalid: {
      // fontFamily: "monospace",
      margin: "4px",
      MozAppearance: "textfield",
      width: "15px",
      borderRadius: "3px",
      fontSize: "14px",
      height: "26px",
      paddingLeft: "7px",
      backgroundColor: "black",
      color: "red",
      border: "1px solid red",
    },
  };

  // 399a46
  return (
    <Authlayout>
      <Typography
        variant="h5"
        align="center"
        p={2}
        component="h2"
        alignItems="center"
      >
        VERIFY ACCOUNT
      </Typography>
      {/* {isError && message} */}

      <Typography
        variant="body2"
        align="center"
        component="h5"
        alignItems="center"
      >
        Enter OTP sent to your email
      </Typography>
      <form onSubmit={handleSubmit} method="put">
        <ReactCodeInput
          type="text"
          onChange={handleChange}
          name="token"
          value={token}
          fields={6}
          {...props}
        />

        <br />
        <div style={{ width: "100%", margin: "1rem" }}>
          <Grid container spacing={2} justifyContent="center">
            {/* <Grid item xs={6}>  */}
            {/* <Button fullWidth size="medium" variant="outlined" type="button">cancel</Button></Grid> */}
            <Grid item xs={6}>
              <LoadingButton
                size="medium"
                loading={isLoading}
                loadingPosition="end"
                variant="contained"
                fullWidth
                type="submit"
              >
                SUBMIT OTP
              </LoadingButton>
            </Grid>
          </Grid>
        </div>
      </form>
    </Authlayout>
  );
}

export default Verification;
