import { Grid, Typography } from '@mui/material'
import React from 'react'
import Header from '../../components/custom/Header'
import FindLove from '../../components/homepage/FindLove'
const Love = () => {
    return (
        <>
            <Header/>
    <div className='love__container'>
              <h2> Search for Partners </h2>
          <Grid container spacing={10}>
              <Grid item xs={12}>
                    <FindLove/>
              </Grid>
    </Grid>
    </div>
      </>
  )
}

export default Love
