import React from 'react'
import Styles from "./styles/success.module.scss"
import Slider from "react-slick";
import { settings } from '../config/SliderSettings';
import { Button, Grid } from '@mui/material';

// import "../../public/assets/img/ghana.png"
function Success() {

    const itemData = [
        {
            img: '/assets/img/ghana.png',
            city: 'Accra, Ghana',

        },
        {
            img: '/assets/img/lagos.png',
            city: 'Lagos, Nigeria',

        },
        {
            img: '/assets/img/france.png',
            city: 'Paris, France',

        },
        {
            img: '/assets/img/london.png',
            city: 'London, UK',

        },
        {
            img: '/assets/img/ghana.png',
            city: 'Accra, Ghana',

        },
        {
            img: '/assets/img/lagos.png',
            city: 'Lagos, Nigeria',

        },
        {
            img: '/assets/img/france.png',
            city: 'Paris, France',

        },
        {
            img: '/assets/img/london.png',
            city: 'London, UK',

        },



    ];


    return (
        <div className={Styles.wrapper}>
            <div className={Styles.success__header}>
                <h3>Meet Singles in Your Area</h3>
                <p>Listen and learn from our community members and find out tips and tricks to
                    meet your love. Join us and be part of a bigger family.</p>
            </div>

            <div className={Styles.slider}>
                <Slider {...settings}>
                    {itemData?.map((data, index) => (
                        <div className={Styles.slides_list} key={index}>
                            <img src={data?.img} alt={data?.city} />
                            <p>{data?.city}</p>
                        </div>
                    ))}
                </Slider>

            </div>
            <div className={Styles.seemore}>
                <Button fullWidth size='large' style={{ backgroundColor: "#FC2A4D" }} variant="contained">Search near you</Button>
            </div>
        </div>
    )
}

export default Success
