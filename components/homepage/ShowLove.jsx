import * as React from "react";
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
import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
} from "@mui/material";
import { format } from "timeago.js";
import { useTheme } from "@mui/material/styles";
import Styles from "./styles/member.module.scss";
import { useDispatch } from "react-redux";
import baseUrl from "../config/Axios";
import { followFriendFollower } from "../../features/slice/users/LoginSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowLove({ open, setOpen, findLover, loading }) {
  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const handleFollowUser = async (friend_id) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/users/follow/${friend_id}/${id}`
      );
      if (data) {
        setLoading(false);
        console.log(data?.isFollow);

        dispatch(followFriendFollower(id));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>

        <div className={Styles.loveWrapper}>
          <h3>{findLover?.length} results found </h3>
          <div className={Styles.img_div}>
            <></>
            {loading
              ? "Loading"
              : findLover?.length?.length <= 0
              ? "No Result found"
              : findLover?.map((item, index) => (
                  <div className={Styles.love__box} key={index}>
                    <img src={item?.avater?.filename} alt={index} />
                    <div className={Styles.memberInfo}>
                      <h2>{item?.username}</h2>
                      <p>{item?.city}</p>
                      <span>{item?.age}</span>
                      <br />
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        sx={{ marginTop: "10px" }}
                        onClick={() => handleFollowUser(item?._id)}
                      >
                        Follow
                      </Button>
                    </div>
                  </div>
                ))}

            {/* <div className={Styles.seemore}>
              <Button
                fullWidth
                size="large"
                style={{ backgroundColor: "#FC2A4D" }}
                variant="contained"
              >
                See All
              </Button>
            </div> */}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
