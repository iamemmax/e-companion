import {
  Avatar,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import Styles from "./styles/activityHeader.module.scss";
import { CreateMyActivityPost } from "../../../../features/slice/post/postSlice";
import { useFormik } from "formik";
import { createPostSchema } from "../../../validation/createUsersSchema";

const ActivityHeader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [img, setImg] = useState([]);
  const handleSubmitImg = (e) => {
    setImg(e.target.files);
  };
  const formik = useFormik({
    initialValues: {
      description: "",
      visibility: "public",
    },
    validationSchema: createPostSchema,

    onSubmit: (values) => {
      let data = {
        description: values.description,
        visibility: values.visibility,
        img,
      };
      dispatch(CreateMyActivityPost(data));
      console.log(data);
    },
  });
  const {
    values: { description, visibility },
    errors,
    handleChange,
    handleSubmit,
    touched,
  } = formik;

  return (
    <div className={Styles.Wrapper}>
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <Grid container spacing={3} p={0}>
          <Grid item xs={2.5} md={1.4}>
            <IconButton>
              <Avatar
                alt="Remy Sharp"
                src={user?.data?.user?.avater?.filename}
                sx={{ height: 60, width: 60 }}
              />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={3}
            justifyContent="flex-start"
            alignItems={"flex-start"}
          >
            <div>
              <Typography variant="body2" component="h4">
                {user?.data?.user?.username}
              </Typography>
            </div>
            <div>
              <FormControl
                variant="filled"
                size="small"
                sx={{ minWidth: 120, border: "none" }}
              >
                <InputLabel
                  id="demo-simple-select-label"
                  size={"small"}
                  sx={{ border: "none", fontSize: 14 }}
                >
                  Visibility
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={visibility}
                  onChange={handleChange}
                  size="small"
                  name="visibility"
                  type="text"
                  error={touched.visibility && Boolean(errors.visibility)}
                  // helperText={touched.visibility && errors.visibility}
                  multiline
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"public"}>Public</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                  <MenuItem value="for me">For me</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid xs={12} pl={3} pt={0} pb={1}>
            <TextField
              id="standard-basic"
              fullWidth
              value={description}
              name="description"
              type="text"
              error={touched.description && Boolean(errors.description)}
              // helperText={touched.description && errors.description}
              multiline
              onChange={handleChange}
              label={
                <span style={{ fontSize: "0.8rem" }}>
                  Whats on your mind {`${user?.data?.user?.username}`}
                </span>
              }
              variant="standard"
            />
          </Grid>
          <Grid xs={12} pl={3}>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Grid xs={4} alignItems="center">
                <Button
                  variant="text"
                  component="label"
                  startIcon={<InsertPhotoOutlinedIcon />}
                  sx={{ textTransform: "capitalize" }}
                >
                  Photo/Video
                  <input
                    hidden
                    accept="image/*"
                    name="img"
                    onChange={handleSubmitImg}
                    multiple
                    type="file"
                  />
                </Button>
              </Grid>

              <Grid xs={4}>
                <Button
                  variant="text"
                  component="label"
                  color="info"
                  startIcon={<AttachFileIcon />}
                  sx={{ textTransform: "capitalize" }}
                >
                  Attach files
                </Button>
              </Grid>
              <Grid xs={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  // component="label"
                  type="submit"
                >
                  Post
                </Button>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ActivityHeader;
