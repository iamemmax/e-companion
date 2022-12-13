import React, { useEffect, useState } from "react";
import Head from "next/head";
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
import {
  getProfile,
  reset,
  updateProfiles,
  uploadProfilePix,
} from "../../features/slice/users/LoginSlice";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import baseUrl from "../../components/config/Axios";
import Loading from "../../components/config/Loader";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import baseUrlUpload from "../../components/config/AxiosUpload";
import { LoadingButton } from '@mui/lab';

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, user, message, isError } = useSelector(
    (state) => state.auth
  );
  const users = user?.data?.user;

  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleImg = (e) => {
    setImg(e.target.files[0]);
  };
  // useEffect(() => {
  //   dispatch(getProfile());
  // }, []);

  const [input, setInput] = useState({
    firstname: users?.firstname || "",
    lastname: users?.lastname || "",
    phone: users?.phone || "",
    gender: users?.gender || "",
    country: users?.country || "",
    state: users?.state || "",
    city: users?.city || "",
    date_of_birth: users?.date_of_birth || "",
  });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  console.log(input);
  //
  const uploadImg = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData();
    formData.append("avater", img);

    setLoading(true)
    try {
      const { data } = await axios.put(
        `${baseUrlUpload}/users/update/profile-img/${users?._id}`,
        formData
      );
      dispatch(uploadProfilePix(data.data.avater));
      setLoading(false)
      setImg(null);
      console.log(data.data.avater);
    } catch (error) {
      setLoading(false)
      console.log(error.message);
    }
  };

  // updating profile details
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      id: users?._id,
      input,
    };

    dispatch(updateProfiles(data));
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(reset());
    }, 3000);
  }, [message, isError]);
  if (isSuccess) {
    toast.success(message, {
      toastId: "success2",
    });
  }
  return (
    <DashboardLayout>
      <Head>
        <title>Update Profile</title>
      </Head>

      <div style={Style.imgBox}>
        <form method="post" onSubmit={uploadImg} encType="multipart/form-data">
          <IconButton
            aria-label="upload picture"
            component="label"
            disableRipple
            disableFocusRipple
            sx={{ position: "absolute", bottom: 0 , right:"1rem"}}
          >
            <input hidden accept="image/*" type="file" onChange={handleImg} />
          <CameraAltOutlinedIcon style={{position:"absolute", right:1, bottom:"10px"}}/>
            <Avatar
              alt="Remy Sharp"
              src={img ? URL.createObjectURL(img) : users?.avater?.filename}
              sx={{ width: 100, height: 100 }}
            />
          </IconButton>
          <IconButton
            aria-label="upload picture"
            component="label"
            disableRipple
            disableFocusRipple
            sx={{ position: "absolute", bottom: -50, right: 10 }}
          >
            {img !== null && (
                  <LoadingButton
          size="medium"
         
          loading={loading}
          loadingPosition="end"
            variant="contained"
            fullWidth
                type="submit"
             
        >
          upload
        </LoadingButton>
            )}
          </IconButton>
        </form>
      </div>
<br/>
      <form onSubmit={handleSubmit} noValidate style={{marginTop:"20px"}} >
        <Grid container spacing={5} p={5} >
          <Grid item xs={12} md={6}>
            <TextField
              label="firstname"
              onChange={handleChange}
              variant="outlined"
              name="firstname"
              fullWidth
              defaultValue={users?.firstname}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="lastname"
              onChange={handleChange}
              variant="outlined"
              fullWidth
              defaultValue={users?.lastname}
              name="lastname"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="phone"
              defaultValue={users?.phone}
              variant="outlined"
              fullWidth
              name="phone"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Date of Birth"
              type="date"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              defaultValue={users?.date_of_birth}
              name="date_of_birth"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Country"
              defaultValue={users?.country}
              variant="outlined"
              onChange={handleChange}
              fullWidth
              name="country"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="State"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              defaultValue={users?.state}
              name="state"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="City"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              defaultValue={users?.city}
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
                  value={users?.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="others">others</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              type="button"
              // onClick={goback}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              type="submit"
              // onClick={submitusers}
            >
              {isLoading ? "upadating..." : "update"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

const Style = {
  imgBox: {
    width: "90px",
    height: "90px",
    margin: "0px auto",
    borderRadius: "50px",
    marginTop: "3rem",
    position: "relative",
    display: "flex",
  },
};
export default Profile;
//   <form method="post" onSubmit={uploadImg} encType="multipart/form-data">
          // <IconButton
          //   aria-label="upload picture"
          //   component="label"
          //   disableRipple
          //   disableFocusRipple
          //   sx={{ position: "absolute", bottom: 0 , right:"1rem"}}
          // >
          //   <input hidden accept="image/*" type="file" onChange={handleImg} />
          //   <CameraAltOutlinedIcon style={{position:"absolute", right:0, bottom:0}}/>
          //   <Avatar
          //     alt="Remy Sharp"
          //     src={img ? URL.createObjectURL(img) : users?.avater?.filename}
          //     sx={{ width: 100, height: 100 }}
          //   />
          // </IconButton>