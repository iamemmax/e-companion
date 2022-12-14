import React from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import AdvertLayout from "../../../layouts/AdvertLayout";

const Profile = ({ user, loading }) => {
  return (
    <AdvertLayout>
      <Grid container justifyContent="center" align="center">
        <Grid item xs={5}>
          <Avatar
            alt="Remy Sharp"
            src={user?.avater?.filename}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="firstname"
            variant="filled"
            disabled
            name="firstname"
            fullWidth
            defaultValue={user?.firstname}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="lastname"
            variant="filled"
            disabled
            fullWidth
            defaultValue={user?.lastname}
            name="lastname"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="phone"
            defaultValue={user?.phone}
            variant="filled"
            disabled
            fullWidth
            name="phone"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="username"
            variant="filled"
            disabled
            fullWidth
            defaultValue={user?.username}
            name="username"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="email"
            defaultValue={user?.email}
            variant="filled"
            disabled
            fullWidth
            name="email"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Date of Birth"
            type="date"
            variant="filled"
            disabled
            fullWidth
            defaultValue={user?.date_of_birth}
            name="date_of_birth"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Country"
            defaultValue={user?.country}
            variant="filled"
            disabled
            fullWidth
            name="country"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="State"
            variant="filled"
            disabled
            fullWidth
            defaultValue={user?.state}
            name="state"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="City"
            variant="filled"
            disabled
            fullWidth
            defaultValue={user?.city}
            name="city"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                name="gender"
                defaultValue={user?.gender}
                variant="filled"
                disabled
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="others">others</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
      </Grid>
    </AdvertLayout>
  );
};

export default Profile;
