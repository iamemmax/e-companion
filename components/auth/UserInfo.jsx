import { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import Styles from "./styles/authcomp.module.scss";
import { useFormik } from "formik";
import { validateUserInfo } from "../validation/createUsersSchema";
import { useDispatch, useSelector } from "react-redux";
import { saveInput } from "../../features/slice/auth/MyUserSlices";

function UserInfo({ next }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.users);

  let { firstname, lastname, username } = userInfo;

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
    },
    validationSchema: validateUserInfo,

    onSubmit: ({ firstname, lastname, username }) => {
      dispatch(saveInput({ firstname, lastname, username }));
      next();
    },
  });
  const { values, errors, handleChange, touched, handleSubmit, setValues } =
    formik;

  useEffect(() => {
    setValues({ firstname, lastname, username });
  }, []);

  return (
    <div className={Styles.inputWrapper}>
      <form onSubmit={handleSubmit} method="post">
        <div>
          <TextField
            id="outlined-basic"
            fullWidth
            onChange={handleChange}
            value={values.firstname}
            variant="outlined"
            label="firstname"
            name="firstname"
            type="text"
            helperText={touched?.firstname && errors?.firstname}
            error={touched?.firstname && errors?.firstname}
          />
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic"
            fullWidth
            onChange={handleChange}
            value={values.lastname}
            variant="outlined"
            label="lastname"
            name="lastname"
            type="text"
            helperText={touched?.lastname && errors?.lastname}
            error={touched?.lastname && errors?.lastname}
          />
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic"
            fullWidth
            onChange={handleChange}
            value={values.username}
            variant="outlined"
            label="username"
            name="username"
            type="text"
            helperText={touched?.username && errors?.username}
            error={touched?.username && errors?.username}
          />
        </div>
        <br />
        <Button
          disabled={!(formik.isValid && formik.dirty)}
          fullWidth
          variant="contained"
          type="submit"
        >
          Next
        </Button>
      </form>
    </div>
  );
}

export default UserInfo;
