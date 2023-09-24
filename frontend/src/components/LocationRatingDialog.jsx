import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Rating, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import {Room} from '@mui/icons-material'
const LocationRatingDialog = ({setTurnOn,longitude,latitude ,currentUsername,setMyPins,turnOn,myPins}) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPin = {
          username: currentUsername,
          title,
          desc,
          ratings: rating,
          latitude,
          longitude
        };
        const addNewPin = async (newPin) => {
          try {
            const setPin = await axios.post("pin/createpin", newPin);
            setMyPins([...myPins, setPin.data.newPin]);
            console.log("sent Data to server", setPin);
          }
          catch (error) {
            console.log(error);
          }
        };
        addNewPin(newPin);
        setTurnOn(false);
        setTitle('');
        setDesc('');
        setRating('');
      };
    return (
        <div >
            <Dialog open={turnOn} onClose={() => setTurnOn(false)}>
                <DialogTitle style={{ backgroundColor: '#f5f5f5', color: '#333' }}>
                    <Box display='flex' alignItems='center'>
                    <Typography variant='h6' style={{ marginRight: '10px' }}>Add a Pin</Typography>
                    <Room fontSize='large' color='primary' />
                    </Box>
                </DialogTitle>
                
                <DialogContent>
                <Avatar alt={currentUsername} src="/static/images/avatar/1.jpg" sx={{ marginRight: '10px' }} />
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            id="desc"
                            label="Description"
                            multiline
                            rows={3}
                            type="text"
                            value={desc}
                            onChange={(e) => { setDesc(e.target.value) }}
                            fullWidth
                            variant="outlined"
                        />
                        <Box component="fieldset" mb={1} borderColor="transparent">
                            <Typography component="legend">Rating</Typography>
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                size='large'
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                            />
                        </Box>
                        <Button type='submit' variant='contained' color='primary' style={{ marginTop: '10px' }}>Rate</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default LocationRatingDialog
