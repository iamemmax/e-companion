import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Styles from "./styles/authcomp.module.scss";
import { validationPasswordSchema } from "../validation/createUsersSchema";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { savedUserPass } from "../../features/slice/auth/MyUserSlices";

function UserPassword({ next, prev }) {
  const dispatch = useDispatch();
  const goback = (e) => {
    e.preventDefault();
    e.stopPropagation();

    prev();
  };

  const { userPass } = useSelector((state) => state.users);

  let { password, password2, gender } = userPass;
  const formik = useFormik({
    initialValues: {
      gender: "",
      password: "",
      password2: "",
    },
    validationSchema: validationPasswordSchema,
    onSubmit: ({ password, password2, gender }) => {
      dispatch(savedUserPass({ password, password2, gender }));
      next();
    },
  });

  const { values, errors, handleChange, handleSubmit, touched, setValues } =
    formik;
  useEffect(() => {
    setValues({ gender, password, password2 });
  }, []);
  return (
    <div className={Styles.inputWrapper}>
      <form onSubmit={handleSubmit}>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gender"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              error={touched?.gender && errors?.gender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="others">others</MenuItem>
            </Select>
          </FormControl>
        </div>
        <br />

        <div>
          <TextField
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={values.password}
            label="password"
            name="password"
            type="password"
            helperText={touched?.password && errors?.password}
            error={touched?.password && errors?.password}
          />
        </div>
        <br />
        <div>
          <TextField
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={values.password2}
            label="confirm Password"
            name="password2"
            type="password"
            helperText={touched?.password2 && errors?.password2}
            error={touched?.password2 && errors?.password2}
          />
        </div>
        <br />
        <div>
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
        </div>
      </form>
    </div>
  );
}

export default UserPassword;
