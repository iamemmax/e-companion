import {
  InputAdornment,
  Typography,
  Modal,
  TextField,
  IconButton,
  Box,
  Grid,
  Button,
  CircularProgress,
  Avatar,
  Divider,
  useMediaQuery,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Styles from "./styles/post.header.module.scss";

import { useTheme } from "@emotion/react";
import { useFormik } from "formik";
import { createPostSchema } from "../validation/createUsersSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateNewPost,
  getPostFromSocket,
  search,
  searchInput,
  searchLatestPost,
} from "../../features/slice/post/postSlice";
import AddComment from "./comment/AddComment";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchBox from "./SearchBox";
import baseUrl from "../config/Axios";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import baseUrlUpload from "../config/AxiosUpload";
import { io } from "socket.io-client";
// import LoadingButton from '@mui/lab/LoadingButton';

function CreateImgPost({ handleClose, setOpen }) {
  const theme = useTheme();
  //   const [open, setOpen] = useState(false);
  const [img, setImg] = useState([]);
  const [video, setVideo] = useState([]);

  const dispatch = useDispatch();
  const { isLoading, isSucess, isError } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [imgPreview, setImgPreview] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [doReload, setDoReload] = useState(false);

  //preview img
  // preview image before uploading
  const socket = useRef();
  useEffect(() => {
    socket.current = io("https://e-companion.onrender.com");
    socket.current.emit("setup", user?.data?.user);
    socket.current.on("getPosts", (data) => {
      if (data?.author === user?.data?.user?._id) return;
      setArrivalMessage(data);
    });
  }, []);

  useEffect(() => {
    let images = [];
    for (let i = 0; i < img.length; i++) {
      const file = img[i];
      images.push({
        url: URL.createObjectURL(file),
      });

      setImgPreview(images);
    }

    return () => URL.revokeObjectURL(images);
  }, [img]);

  // delete seleted image
  const deleteFile = (event) => {
    const s = imgPreview.filter((item, index) => index !== event);
    setImgPreview(s);
  };
  //upload img
  const handleSubmitImg = (e) => {
    setImg(e.target.files);
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      visibility: "public",
      img,
    },
    validationSchema: createPostSchema,

    onSubmit: async (values) => {
      setLoading(true);
      try {
        console.log(img);
        let newData = new FormData();
        newData.append("visibility", values.visibility);
        newData.append("description", values.description);
        newData.append("author", user?.data?.user?._id);
        newData.append("userId", user?.data?.user?._id);

        for (let i = 0; i < img.length; i++) {
          newData.append("img", img[i]);
        }

        const { data } = await axios.post(
          `${baseUrlUpload}/posts/new`,
          newData
        );
        if (data) {
          toast.success(data?.msg, { toastId: "success1" });
          dispatch(CreateNewPost(data?.data));
          socket.current.emit("createNewPost", data?.data);
          console.log(data?.data);
          setDoReload(true);
          setLoading(false);
          setOpen(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.msg, { toastId: "error1" });
        console.log(error);
      }
    },
  });
  const {
    values: { description, visibility, myId },
    errors,
    handleChange,
    handleSubmit,
    touched,
  } = formik;

  useEffect(() => {
    dispatch(CreateNewPost(arrivalMessage));
  }, [arrivalMessage]);
  return (
    <div>
      <Box>
        <form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
        >
          {/* <Typography variant="h5" p={3} align="center">
            Create new Post
          </Typography> */}
          <div>
            <TextField
              fullWidth
              variant="outlined"
              size="medium"
              label="description"
              onChange={handleChange}
              value={description}
              name="description"
              type="text"
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
              multiline
            />
          </div>
          <br />
          <div>
            <FormControl variant="outlined" size="small" fullWidth>
              {/* <InputLabel
                  id="demo-simple-select-outlined-label"
                  size={"small"}
                  sx={{ border: "none", fontSize: 14 }}
                >
                  Visibility
                </InputLabel> */}
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={visibility}
                onChange={handleChange}
                size="medium"
                name="visibility"
                type="text"
                fullWidth
                label="Visibility"
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
          <br />
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  size="large"
                >
                  Upload Images
                  <input
                    type="file"
                    hidden
                    multiple
                    name="img"
                    onChange={handleSubmitImg}
                    accept="image/*"
                  />
                </Button>
              </Grid>
            </Grid>
          </div>
          <br />
          {imgPreview?.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexFlow: "row wrap",
                position: "relative",
                minHeight: "200px",
              }}
            >
              {imgPreview &&
                imgPreview.map((data, index) => (
                  <div
                    style={{ width: "100px", position: "relative" }}
                    key={index}
                  >
                    <img
                      src={data.url}
                      alt="product images"
                      width={80}
                      height={80}
                    />

                    <div
                      style={{
                        backgroundColor: "#3f2248",
                        position: "absolute",
                        right: "10px",
                        top: -20,
                        borderRadius: "100%",
                      }}
                    >
                      <IconButton
                        onClick={() => deleteFile(index)}
                        color="primary"
                      >
                        <CloseOutlinedIcon />
                      </IconButton>
                    </div>
                  </div>
                ))}
            </div>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <LoadingButton
                size="small"
                loading={loading}
                loadingPosition="end"
                variant="contained"
                fullWidth
                type="submit"
              >
                Create post
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}

export default CreateImgPost;
