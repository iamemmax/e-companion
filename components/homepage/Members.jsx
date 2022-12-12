import React from "react";
import Styles from "./styles/member.module.scss";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
function Members() {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const itemData = [
    {
      id: "1",
      img: "/assets/img/Rectangle____16.png",
      title: "Andres P. Conley",
      city: "Lekki, Lagos",
      age: "26 Years Old",
      featured: true,
    },
    {
      id: "2",
      img: "/assets/img/Rectangle__14.png",
      title: "Samuel P",
      city: "Lekki, Lagos",
      age: "26 Years Old",
    },

    {
      id: "3",

      img: "/assets/img/Rectangle__14.png",
      title: "Andres P. Conley",
      city: "Lekki, Lagos",
      age: "26 Years Old",
      featured: true,
    },
    {
      id: "4",

      img: "/assets/img/Rectangle____16.png",
      title: "Samuel P",
      city: "Lekki, Lagos",
      age: "26 Years Old",
    },

    {
      id: "5",

      img: "/assets/img/Rectangle____16.png",
      title: "Andres P. Conley",
      city: "Lekki, Lagos",
      age: "26 Years Old",
      featured: true,
    },
    {
      id: "6",

      img: "/assets/img/Rectangle____16.png",
      title: "Samuel P",
      city: "Lekki, Lagos",
      age: "26 Years Old",
    },

    {
      id: "7",

      img: "/assets/img/Rectangle____16.png",
      title: "Andres P. Conley",
      city: "Lekki, Lagos",
      age: "26 Years Old",
      featured: true,
    },
    {
      id: "8",

      img: "/assets/img/Rectangle__15.png",
      title: "Samuel P",
      city: "Lekki, Lagos",
      age: "26 Years Old",
    },

    {
      id: "9",

      img: "/assets/img/Rectangle_18.png",
      title: "Andres P. Conley",
      city: "Lekki, Lagos",
      age: "26 Years Old",
      featured: true,
    },
    {
      id: "10",

      img: "/assets/img/Rectangle_14.png",
      title: "Samuel P",
      city: "Lekki, Lagos",
      age: "26 Years Old",
    },
  ];
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.member__header}>
        <h3>Meet New People TodaY!</h3>
        <h2>New Memebers in Your City</h2>
      </div>
      <div className={Styles.img__list}>
        {/* {
          <ImageList className={Styles.img_container}>
            <ImageListItem
              key="Subheader"
              cols={matchDownMd ? 2 : 5}
            ></ImageListItem> */}
        <Grid
          container
          spacing={3}
          style={{ position: "relative", overflow: "hidden" }}
        >
          {itemData.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{
                height: "320px",
                position: "relative",
                overflow: "hidden",
              }}
              key={item?.id}
            >
              <img src={item?.img} />
              <div className={Styles.memberInfo}>
                <h2>{item?.title}</h2>
                <p>{item?.city}</p>
                <span>{item?.age}</span>
              </div>
            </Grid>
          ))}
        </Grid>
        <div className={Styles.seemore}>
          <Button
            fullWidth
            size="large"
            style={{ backgroundColor: "#FC2A4D" }}
            variant="contained"
          >
            See All
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Members;
