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
  Tabs,
  Tab,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import React, { useEffect, useState, useRef } from "react";
import Styles from "./styles/post.header.module.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import FilterOutlinedIcon from "@mui/icons-material/FilterOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { useTheme } from "@emotion/react";
import { useFormik } from "formik";
import { createPostSchema } from "../validation/createUsersSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateNewPost,
  search,
  searchInput,
  searchLatestPost,
} from "../../features/slice/post/postSlice";
import AddComment from "./comment/AddComment";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchBox from "./SearchBox";
import baseUrl from "../config/Axios";
import axios from "axios";
import CreateImgPost from "./CreateImgPost";
import CreateVideoPost from "./CreateVideoPost";
// import LoadingButton from '@mui/lab/LoadingButton';

function PostHeader() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [img, setImg] = useState([]);
  const [video, setVideo] = useState([]);

  const dispatch = useDispatch();

  const { isLoading, isSucess, isError } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [imgPreview, setImgPreview] = useState(null);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  };

  const handleOpen = () => {
    setOpen(true);
    setValue("1");
  };
  const handleClose = () => setOpen(false);
  const { search } = useSelector((state) => state.posts);

  // search input
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const searchNow = async (e) => {
    if (searchValue === "" || searchValue === null) return;
    dispatch(searchInput(searchValue));
    setOpenSearch(true);
    setSearchValue("");
  };

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          // sx={{
          //   width: "100%",
          //   typography: "body1",
          //   align: "center",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   height: "100%",
          // }}
          style={style}
        >
          <div className={Styles.postModal}>
            <Box sx={{ width: "100%", typography: "body1", margin: 2 }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    background: "white",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Create post with Images" value="1" />
                    <Tab label="Create post with Video" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1" setOpen={setOpen}>
                  <CreateImgPost />
                </TabPanel>
                <TabPanel value="2">
                  <CreateVideoPost />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </Box>
      </Modal>

      <div className={Styles.search__bar}>
        <TextField
          placeholder="Search"
          fullWidth
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick={searchNow}>
                <IconButton>
                  <SearchOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          size="small"
          defaultValue={searchValue}
        />
      </div>
      <div className={Styles.header__container}>
        <Grid container spacing={2} alignItems="center">
          <Grid item sx={2} md={1}>
            <Avatar
              alt="Remy Sharp"
              src={user?.data?.user?.avater?.filename}
              sx={{ width: 40, height: 40 }}
            />
          </Grid>
          <Grid item xs={9} md={11}>
            <Button
              onClick={handleOpen}
              variant="contained"
              size="small"
              disableElevation
              fullWidth
              style={{ color: "#fff" }}
            >
              {` What is on your mind ${user?.data?.user?.username}`}
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ padding: "5px" }} />
      </div>

      <AddComment setOpen={setOpen} />
      <SearchBox
        openSearch={openSearch}
        setOpen={setOpen}
        handleClose={handleClose}
        setOpenSearch={setOpenSearch}
      />
    </div>
  );
}

export default PostHeader;
