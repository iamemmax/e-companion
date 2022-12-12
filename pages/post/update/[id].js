import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/config/Loader";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import {
  deletePostImg,
  DeletePostImg,
  reset,
  singlePost,
  updatePost,
} from "../../../features/slice/post/postSlice";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import axios from "axios";
import baseUrl from "../../../components/config/Axios";
import { toast } from "react-toastify";
import UpdateProstImage from "../../../components/post/UpdateProstImage";

const UpdatePosts = () => {
  const router = useRouter();
  const { id } = router.query;
  const auth = useSelector((state) => state.auth?.user);
  const datas = auth?.data;

  const dispatch = useDispatch();
  const { post, isLoading, message, isError, isSuccess } = useSelector(
    (state) => state?.posts
  );

  const [input, setInput] = useState({
    description: post?.description || "",
    visibility: post?.visibility,
  });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let data = {
      id,
      input,
    };
    dispatch(updatePost(data));
  };

  useEffect(() => {
    dispatch(singlePost(id));
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(reset());
    }, 3000);
  }, [message, isError]);
  if (isSuccess) {
    toast.success(message !== "" && message, {
      toastId: "success2",
    });
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <DashboardLayout>
      <Typography variant="h5" align="center" component={"h2"} p={2}>
        Update Post
      </Typography>
      <Grid
        container
        p={5}
        spacing={4}
        justifyContent="center"
        alignItems="center"
        align="center"
      >
        <Grid item xs={10} md={10}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem",
              flexFlow: "row wrap",
            }}
          >
            {post?.img?.map((img) => (
              <UpdateProstImage img={img} key={img._id} post={post} />
            ))}
          </div>
        </Grid>
        <br />
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "2rem" }}
        >
          <Grid xs={12} md={8}>
            <TextField
              label="Description"
              onChange={handleChange}
              variant="outlined"
              name="description"
              fullWidth
              size="medium"
              defaultValue={post?.description}
            />
          </Grid>
          <br />
          <Grid xs={12} md={8}>
            <FormControl fullWidth size="medium">
              <InputLabel id="demo-simple-select-label">Visibility</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                name="visibility"
                defaultValue={post?.visibility}
                onChange={handleChange}
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
                <MenuItem value="for me">For me</MenuItem>
              </Select>
            </FormControl>
            <Grid>
              <br />
              <Button fullWidth variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </DashboardLayout>
  );
};

export default UpdatePosts;
