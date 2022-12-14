import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DisplaySearchPost from "./DisplaySearchPost";
import DisplaySearchUsers from "./DisplaySearchUsers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import baseUrl from "../config/Axios";
import DisplayRecentPost from "./DisplayRecentPost";
// import { searchUsers } from "../../features/slice/users/UserSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchBox({ openSearch, setOpenSearch }) {
  // const [openSearch, setOpenSearch] = React.useState(false);
  const { search } = useSelector((state) => state.posts);
  const [people, setPeople] = useState([]);
  const [latestPost, setLatestPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState("1");
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpenSearch(false);
  };

  const fetchSeachPost = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/posts?search=${search}`);
      console.log(data);
      setLoading(false);
      if (data) {
        setLatestPost(data?.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSeachPost();
    fetchSearchUsers();
  }, [search]);

  const fetchSearchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/users?search=${search}`);
      console.log(data);
      setLoading(false);

      setPeople(data.data);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  let datas;
  return (
    <div>
      <Dialog
        fullScreen
        open={openSearch}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar color="secondary" sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="primary"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider" }}
              align="center"
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Recent Post" value="1" />
                <Tab label="People" value="2" />
                <Tab label="Lastest Post" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <DisplaySearchPost latestPost={latestPost} loading={loading} />
            </TabPanel>
            <TabPanel value="2">
              <DisplaySearchUsers
                people={people}
                loading={loading}
                datas={datas}
              />
            </TabPanel>
            <TabPanel value="3">
              <DisplayRecentPost latestPost={latestPost} loading={loading} />
            </TabPanel>
          </TabContext>
        </Box>
      </Dialog>
    </div>
  );
}
