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
// import LoadingButton from '@mui/lab/LoadingButton';
import { io } from "socket.io-client";

function CreateVideoPost({ handleClose, setOpen }) {
  const theme = useTheme();
  //   const [open, setOpen] = useState(false);
  const [img, setImg] = useState([]);
  const [video, setVideo] = useState(null);

  const dispatch = useDispatch();
  const { isLoading, isSucess, isError } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [imgPreview, setImgPreview] = useState(null);
  const [doReload, setDoReload] = useState(false);

  const [loading, setLoading] = useState(false);
  const socket = useRef();
  useEffect(() => {
    socket.current = io("https://e-companion.onrender.com");
    socket.current.emit("setup", user?.data?.user);
  }, []);
  //upload img

  const handleSubmitImg = (e) => {
    setVideo(e.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      visibility: "public",
      video,
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

        newData.append("video", video);

        const { data } = await axios.post(
          `${baseUrlUpload}/posts/video/new`,
          newData
        );
        if (data) {
          toast.success(data?.msg, { toastId: "success1" });
          dispatch(CreateNewPost(data?.data));
          setDoReload(true);
          socket.current.emit("createNewPost", data?.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.msg, { toastId: "error1" });
        console.log(error);
      }
    },
  });
  useEffect(() => {
    socket.current.on("getPosts", (data) => {
      if (data?.author?._id === user?.data?.user?._id) return;
      dispatch(getPostFromSocket(data));
    });
  }, [doReload]);
  const {
    values: { description, visibility, myId },
    errors,
    handleChange,
    handleSubmit,
    touched,
  } = formik;

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
                  Upload Video
                  <input
                    type="file"
                    hidden
                    name="video"
                    onChange={handleSubmitImg}
                    accept="video/*"
                  />
                </Button>
              </Grid>
            </Grid>
          </div>
          <br />

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

export default CreateVideoPost;
