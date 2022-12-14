import React, { useState } from "react";
import Styles from "./styles/success.module.scss";
import Slider from "react-slick";
import { settings } from "../config/SliderSettings";
import { Button, Grid } from "@mui/material";
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
import axios from "axios";
import baseUrl from "../config/Axios";
import DisplaySearchUsers from "../post/DisplaySearchUsers";
// import "../../public/assets/img/ghana.png"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Success() {
  const itemData = [
    {
      img: "/assets/img/ghana.png",
      city: "Ghana",
    },
    {
      img: "/assets/img/lagos.png",
      city: "Nigeria",
    },
    {
      img: "/assets/img/france.png",
      city: "France",
    },
    {
      img: "/assets/img/london.png",
      city: "UK",
    },
    {
      img: "/assets/img/ghana.png",
      city: "Ghana",
    },
    {
      img: "/assets/img/lagos.png",
      city: "Germany",
    },
    {
      img: "/assets/img/france.png",
      city: "China",
    },
    {
      img: "/assets/img/london.png",
      city: "Morroco",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [people, setPeople] = useState([]);
  const handleClick = async (datas) => {
    setOpen(true);
    setCountry(datas);
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/users?country=${"china"}`);
      console.log(data);
      setLoading(false);
      if (data) {
        setPeople(data?.data);
        setCountry("");
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCountry("");
  };

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.success__header}>
        <h3>Meet Singles in Your Area</h3>
        <p>
          Listen and learn from our community members and find out tips and
          tricks to meet your love. Join us and be part of a bigger family.
        </p>
      </div>

      <div className={Styles.slider}>
        <Slider {...settings}>
          {itemData?.map((data, index) => (
            <div
              className={Styles.slides_list}
              key={index}
              onClick={() => handleClick(data?.city)}
            >
              <img src={data?.img} alt={data?.city} />
              <p>{data?.city}</p>
            </div>
          ))}
        </Slider>
      </div>
      <Dialog
        fullScreen
        open={open}
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
        <DisplaySearchUsers people={people} loading={loading} />
      </Dialog>
      <div className={Styles.seemore}>
        <Button
          fullWidth
          size="large"
          style={{ backgroundColor: "#FC2A4D" }}
          variant="contained"
        >
          Search near you
        </Button>
      </div>
    </div>
  );
}

export default Success;
