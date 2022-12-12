import React from "react";
import Styles from "./styles/work.module.scss";
import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPeopleCarry, FaPeopleArrows } from "react-icons/fa";
import { GiLoveHowl } from "react-icons/gi";
function Work() {
  return (
    <div className={Styles.work_wrapper}>
      <div className={Styles.work__header}>
        <h3>How Does it Work​</h3>
      </div>
      <div className={Styles.container}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <div className={Styles.links}>
              <Link href="/">
                <>
                 
                    <i>
                      <AiOutlineSearch />
                    </i>
                    Search Your Partner
                
                </>
              </Link>
              <Link href="/">
               
                  {" "}
                  <i>
                    <GiLoveHowl />
                  </i>{" "}
                  Live The Story
              
              </Link>
              <Link href="/">
               
                  {" "}
                  <i>
                    <FaPeopleCarry />
                  </i>{" "}
                  100% Match People
              
              </Link>
              <Link href="/">
               
                  {" "}
                  <i>
                    <FaPeopleArrows />
                  </i>{" "}
                  Find Out Partner
                
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className={Styles.rightWrapper}>
              <div className={Styles.text}>
                <h3>100% Match People</h3>
                <p>
                  The simple steps to follow to have great experience using
                  Edate. all you have to do is follows your gut and awesome your
                  heart!
                </p>
              </div>
              <div className={Styles.imgbox}>
                <img src="/assets/img/lover.png" />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Work;
