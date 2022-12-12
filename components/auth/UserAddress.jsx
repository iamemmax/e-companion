import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
} from "@mui/material";
import Styles from "./styles/authcomp.module.scss";
import { useFormik } from "formik";
import { validateAddress } from "../validation/createUsersSchema";
import { useDispatch, useSelector } from "react-redux";

import { Country, State, City } from "country-state-city";
import { savedUserAddress } from "../../features/slice/auth/MyUserSlices";

function UserAddress({ next, prev }) {
  const dispatch = useDispatch();
  const goback = (e) => {
    e.preventDefault();
    e.stopPropagation();
    prev();
  };

  const { userAddress } = useSelector((state) => state.users);

  const [countryLists, setCountryLists] = useState([]);
  const [countrys, setCountry] = useState("");
  const [contryCodes, setContryCodes] = useState("");
  const [stateLists, setStateLists] = useState([]);
  const [states, setState] = useState("");
  const [cityLists, setCityLists] = useState([]);
  const [citys, setCity] = useState("");

  const handleCountry = (e) => {
    setContryCodes(e.target.value);
    setStateLists(State.getStatesOfCountry(e.target.value));
    setCountry(e.target.value);
  };
  const handleState = (e) => {
    // console.log(e.target);
    setCityLists(City.getCitiesOfState(contryCodes, e));
    setState(e);

    // console.log(contryCodes);
  };

  const handleCity = (e) => {
    // console.log(e.target);
    setCity(e.target.value);
  };
  // useEffect(() => {
  //     setCountryLists(Country.getAllCountries());
  //     setStateLists(State.getStatesOfCountry(countrys));
  //     setCityLists(City.getCitiesOfState(countrys, states))

  // }, [countrys, states, citys]);

  let { state, country, city } = userAddress;
  const formik = useFormik({
    initialValues: {
      country: "",
      state: "",
      city: "",
    },
    validationSchema: validateAddress,
    onSubmit: ({ country, state, city }) => {
      dispatch(savedUserAddress({ country, state, city }));
      next();
    },
  });
  const { values, errors, handleSubmit, handleChange, touched, setValues } =
    formik;
  useEffect(() => {
    setValues({ country, state, city });
  }, []);

  return (
    <div className={Styles.inputWrapper}>
      {/* <form onSubmit={handleSubmit} method="post">
                <div className="country">
                    <FormControl fullWidth>

                        <InputLabel id="demo-simple-select-label">Country</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Country"
                            name="country"
                            value={countrys || ""}
                            onChange={handleCountry}
                        >
                            {countryLists.map((x, i) => (
                                <MenuItem key={i} value={x.isoCode}>
                                    {x.name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </div>
                <br />
                <div className="state">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">State</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="State"
                            name="state"
                            value={states || ""}
                            onChange={(e) => handleState(e.target.value)}
                        >
                            {stateLists.map((x, i) => (
                                <MenuItem key={i} value={x.isoCode}>
                                    {x.name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </div>
                <input type="text" onChange={handleChange} value={values.country} name="country" />
                <input type="text" onChange={handleChange} value={values.state} name="state" />
                <input type="text" onChange={handleChange} value={values.city} name="city" />

                <br />
                <div className="city">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">City</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="City"
                            name="city"
                            value={citys || ""}
                            onChange={handleCity}
                        >
                            {cityLists.map((x, i) => (
                                <MenuItem key={i} value={x.name}>
                                    {x.name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>

                </div>
                <br />
                <div>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Button fullWidth size="large" variant="contained" type="submit" onClick={goback}>Prev</Button></Grid>
                            <Grid item xs={6} >
                                <Button disabled={!(formik.isValid && formik.dirty)} fullWidth size="large" variant="contained" type="submit" >Next</Button></Grid>
                        </Grid>
                    </div>
                </div>
            </form> */}

      <form onSubmit={handleSubmit} method="post">
        <div>
          <TextField
            id="outlined-basic"
            fullWidth
            onChange={handleChange}
            value={values.country}
            variant="outlined"
            label="country"
            name="country"
            type="text"
            helperText={touched?.country && errors?.country}
            error={touched?.country && errors?.country}
          />
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic"
            fullWidth
            onChange={handleChange}
            value={values.state}
            variant="outlined"
            label="state"
            name="state"
            type="text"
            helperText={touched?.state && errors?.state}
            error={touched?.state && errors?.state}
          />
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic"
            fullWidth
            onChange={handleChange}
            value={values.city}
            variant="outlined"
            label="city"
            name="city"
            type="text"
            helperText={touched?.city && errors?.city}
            error={touched?.city && errors?.city}
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

export default UserAddress;
