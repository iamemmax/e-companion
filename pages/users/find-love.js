import { Grid, Typography } from '@mui/material'
import React from 'react'
import Header from '../../components/custom/Header'
import FindLove from '../../components/homepage/FindLove'
import AdvertLayout from '../../components/layouts/AdvertLayout'
const Love = () => {
    return (
        <>
            <Header/>
            <AdvertLayout>
                  <div className='love__container'>
              <h2> Search for Partners </h2>
          <Grid container spacing={1}>
              <Grid item xs={12}>
                    <FindLove/>
              </Grid>
    </Grid>
    </div>
        </AdvertLayout>
      </>
  )
}

export default Love
