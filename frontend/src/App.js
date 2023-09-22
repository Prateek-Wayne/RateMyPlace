import './App.css';
import Map, { Marker,Popup } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import {Room} from '@mui/icons-material';
import { Box,Typography,Dialog,DialogActions, DialogContent,DialogContentText,DialogTitle, TextField, Button} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const Mylongitude = 77.620231;
 const Mylatitude = 13.040392234751348;
 const [turnOn,setTurnOn]=useState(false);
 const [myPins,setMyPins]=useState([]);
 const [currentPlaceId,setCurrentPlaceId] =useState(null);
 //UseStates for Form
 const [name,setName]=useState('');
 const [title,setTitle]=useState('');
 const [desc,setDesc]=useState('');
 const [rating,setRating]=useState('');

 const handleMarkerClick=(id)=>{
  setCurrentPlaceId(id);
  console.log(id,currentPlaceId);
 };
  const handleAddNewLocation=(e)=>{
    setTurnOn(true);
    console.log(e.lngLat)
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(name,title,desc,rating);
  };
  useEffect(()=>{
   
    const getData=async()=>{
      try {
        const Pins=await  axios.get("pin/getpin");
        // console.log("Original Data",Pins);
        setMyPins(Pins.data.allPin);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  },[])
 
  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      initialViewState={{
        longitude:Mylongitude,
        latitude: Mylatitude,
        zoom: 17
      }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onDblClick = {handleAddNewLocation}
    >
      {
        myPins.map((pin,index)=>{
          return(
            <>
                <Marker  longitude={pin.longitude} latitude={pin.latitude} anchor="bottom" >
                  <Room onClick={()=>handleMarkerClick(pin._id)}  style={{color:'blueviolet' ,fontSize:'4rem',cursor:'crosshair'}}/>
                </Marker>
                {
                  pin._id===currentPlaceId &&(
                <Popup
                  key={pin._id}
                  longitude={pin.longitude}
                  latitude={pin.latitude}
                  anchor='left'
                  closeOnClick={false}
                  onClose={()=>{setCurrentPlaceId(null)}}
                >
                    <Box sx={{ width:'200px',height:'250px' ,border:'2px solid black',display:'flex',justifyContent:'space-evenly',flexDirection:'column',margin:'-10px' }}>
                      <Box sx={{display:'inline' ,marginLeft:'10px' }}>
                        <Typography variant='h6' display='inline'  > User </Typography>
                        <Typography variant='body1' component='span' style={{marginLeft:'20px'}} > {pin.username} </Typography>
                      </Box>
                      <Box sx={{display:'inline' ,marginLeft:'10px' }}>
                        <Typography variant='h6' display='inline'  >Place</Typography>
                        <Typography variant='body1' component='span' style={{marginLeft:'20px'}}  > {pin.title} </Typography>
                      </Box>
                      <Box sx={{display:'inline' ,marginLeft:'10px' }}>
                        <Typography variant='h6' display='inline'  > Disc </Typography>
                        <Typography variant='body1' component='span' style={{marginLeft:'20px'}}  > {pin.desc} </Typography>
                      </Box>
                      <Box sx={{display:'inline' ,marginLeft:'10px' }}>
                        <Typography variant='h6' display='inline'  > Rating </Typography>
                        <Typography variant='body1' component='span' style={{marginLeft:'20px'}}  > {pin.ratings} </Typography>
                      </Box>
                    </Box>
                </Popup>
                  )
                } 
                {
                  turnOn && (
                    <Dialog open={turnOn} onClose={()=>setTurnOn(false)}>
                      <DialogTitle>Rate Location</DialogTitle>
                      <DialogContent>
                        <form onSubmit={()=>{handleSubmit()}}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Name"
                          type="text"
                          fullWidth
                          value={name}
                          onChange={(e)=>{setName(e.target.value)}}
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="title"
                          label="Title"
                          type="text"
                          value={title}
                          onChange={(e)=>{setTitle(e.target.value)}}
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="desc"
                          label="Desc"
                          type="text"
                          value={desc}
                          onChange={(e)=>{setDesc(e.target.value)}}
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="rating"
                          label="Rating"
                          value={rating}
                          onChange={(e)=>{setRating(e.target.value)}}
                          type="text"
                          fullWidth
                          variant="standard"
                          />
                        <Button  type='submit'>Submit</Button>
                          </form>
                      </DialogContent>
                      <DialogActions>
                     
                      </DialogActions>
                    </Dialog>
                  )
                }
            </>
          )
        }
        )
      }
    </Map>
  );
}
export default App;

