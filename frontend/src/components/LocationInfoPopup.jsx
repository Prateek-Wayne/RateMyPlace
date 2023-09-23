import { Avatar, Box, Divider, Rating, Typography } from '@mui/material'
import React from 'react'

const LocationInfoPopup = ({pin}) => {
  return (
    <Box sx={{ width: '250px', border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.15)' }}>
                    <Box sx={{ padding: '10px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center' }}>
                      <Avatar alt={pin.username} src="/static/images/avatar/1.jpg" sx={{ marginRight: '10px' }} />
                      <Box>
                        <Typography variant='h6' color='textSecondary'>{pin.username}</Typography>
                      </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ padding: '10px' }}>
                      <Typography variant='h6' color='textSecondary'>Place</Typography>
                      <Typography variant='body1'>{pin.title}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ padding: '10px', maxHeight: '60px', overflowY: 'auto' }}>
                      <Typography variant='h6' color='textSecondary'>Description</Typography>
                      <Typography variant='body2'>{pin.desc}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
                      <Typography variant='h6' color='textSecondary'>Rating</Typography>
                      <Rating name="read-only" value={pin.ratings} readOnly />
                    </Box>
                  </Box>
  )
}

export default LocationInfoPopup
