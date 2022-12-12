import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

import { red } from '@mui/material/colors';


import moment from "moment"
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';



const FollowerProfileInfo = () => {
    
   
  const {followerProfile} = useSelector(state => state.auth)
 


  return (
      <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
           {followerProfile?.username?.slice(0,1)}
          </Avatar>
        }
       
              title={<>{followerProfile?.firstname} {followerProfile?.lastname} <br/></>} 
        subheader={`Join at ${moment(followerProfile?.createdAt).format('LL')}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={followerProfile?.avater?.filename}
        alt={followerProfile?.username}
      />
      <CardContent>
       <ListItem alignItems="flex-start">
        
        <ListItemText
          primary=" Username"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {followerProfile?.username}
            </React.Fragment>
          }
        />
      </ListItem>
       <ListItem alignItems="flex-start">
        
        <ListItemText
          primary=" Country"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {followerProfile?.country}
            </React.Fragment>
          }
        />
      </ListItem>
       <ListItem alignItems="flex-start">
        
        <ListItemText
          primary=" State"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {followerProfile?.state}
            </React.Fragment>
          }
        />
      </ListItem>
       <ListItem alignItems="flex-start" display="flex">
        
        <ListItemText
          primary=" city"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {followerProfile?.city}
            </React.Fragment>
          }
        />
      </ListItem>

      </CardContent>
    
     
    </Card>
  )
}

export default FollowerProfileInfo
