import React from 'react'
import Styles from "./styles/member.module.scss"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Button, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';

function Popular() {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const itemData = [
        {
            id: "1",
            img: '/assets/img/Rectangle____16.png',
            title: 'Andres P. Conley',
            city: 'Lekki, Lagos',
            age: "26 Years Old",
            featured: true,
        },
        {
            id: "2",
            img: '/assets/img/Rectangle__14.png',
            title: 'Samuel P',
            city: 'Lekki, Lagos',
            age: "26 Years Old",


        },

        {
            id: "3",

            img: '/assets/img/Rectangle__14.png',
            title: 'Andres P. Conley',
            city: 'Lekki, Lagos',
            age: "26 Years Old",
            featured: true,
        },
        {
            id: "4",

            img: '/assets/img/Rectangle____16.png',
            title: 'Samuel P',
            city: 'Lekki, Lagos',
            age: "26 Years Old",


        },

        {
            id: "5",

            img: '/assets/img/Rectangle____16.png',
            title: 'Andres P. Conley',
            city: 'Lekki, Lagos',
            age: "26 Years Old",
            featured: true,
        },
        {
            id: "6",

            img: '/assets/img/Rectangle____16.png',
            title: 'Samuel P',
            city: 'Lekki, Lagos',
            age: "26 Years Old",


        },

        {
            id: "7",

            img: '/assets/img/Rectangle____16.png',
            title: 'Andres P. Conley',
            city: 'Lekki, Lagos',
            age: "26 Years Old",
            featured: true,
        },
        {
            id: "8",

            img: '/assets/img/Rectangle__15.png',
            title: 'Samuel P',
            city: 'Lekki, Lagos',
            age: "26 Years Old",


        },

        {
            id: "9",

            img: '/assets/img/Rectangle_18.png',
            title: 'Andres P. Conley',
            city: 'Lekki, Lagos',
            age: "26 Years Old",
            featured: true,
        },
        {
            id: "10",

            img: '/assets/img/Rectangle_14.png',
            title: 'Samuel P',
            city: 'Lekki, Lagos',
            age: "26 Years Old",


        },



    ];
    return (
        <div className={Styles.wrapper}>
            <div className={Styles.member__header}>
                <h3>Most Popular Members</h3>
                <p>Learn from them and try to make it to this board. This will for sure boost you
                    visibility and increase your chances to find you loved one.</p>
            </div>
            <div className="img__list">
                {
                    <ImageList className={Styles.img_container}>
                        <ImageListItem key="Subheader" cols={matchDownMd ? 2 : 5}>
                        </ImageListItem>
                        {itemData.map((item) => (
                            <ImageListItem key={item.img} className={Styles.imgList} id={item?.id}>
                                <img
                                    src={`${item?.img}?w=248&fit=crop&auto=format`}
                                    srcSet={`${item?.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item?.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={item?.title}
                                    // subtitle={item.author}
                                    subtitle={
                                        <span style={{ fontSize: "14px", textAlign: "center", lineHeight: "20px" }}>
                                            {item.city}
                                            <br />
                                            {item?.age}
                                            <br />
                                        </span>




                                    }



                                />


                            </ImageListItem>
                        ))}
                    </ImageList>
                }
                <div className={Styles.seemore}>
                    <Button fullWidth size='large' style={{ backgroundColor: "#FC2A4D" }} variant="contained">See All</Button>
                </div>
            </div>
        </div >
    )
}

export default Popular
