import './App.css';
import Map, { Marker, Popup } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { Room } from '@mui/icons-material';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Divider, Rating, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const Mylongitude = 77.620231;
  const Mylatitude = 13.040392234751348;
  const [currentUsername, setCurrentUsername] = useState('');
  const [turnOn, setTurnOn] = useState(false);
  const [myPins, setMyPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  
  //UseStates for Form
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [rating, setRating] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [zoom, setZoom] = useState(17);
  const handleZoom = (x) => {
    setZoom(x.viewState.zoom);
    // console.log(zoom);
  };
 
  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
    // console.log(id, currentPlaceId);
  };
  const handleAddNewLocation = (e) => {
    setTurnOn(true);
    const tempLat = e.lngLat.lat;
    const tempLong = e.lngLat.lng;
    setLongitude(tempLong);
    setLatitude(tempLat);
    console.log(e.lngLat);
    console.log(longitude, latitude);
  }
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
  useEffect(() => {
    setCurrentUsername("Jetha");
    const getData = async () => {
      try {
        const Pins = await axios.get("pin/getpin");
        setMyPins(Pins.data.allPin);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [])


  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      initialViewState={{
        longitude: Mylongitude,
        latitude: Mylatitude,
        zoom
      }}
      style={{ width: "100vw", height: "100vh" }}
      onZoom={handleZoom}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onDblClick={handleAddNewLocation}
    >
      {myPins.map((pin, index) => {
        return (
          <>
            <Marker longitude={pin.longitude} latitude={pin.latitude} anchor="bottom" >
              <Room
                onClick={() => handleMarkerClick(pin._id)}
                style={{
                  color: pin.username === currentUsername ? 'orange' : 'blue',
                  fontSize: 3*zoom,
                  cursor: 'crosshair'
                }}
              />
            </Marker>
            {
              pin._id === currentPlaceId && (
                <Popup
                  key={pin._id}
                  longitude={pin.longitude}
                  latitude={pin.latitude}
                  anchor='left'
                  closeOnClick={false}
                  onClose={() => { setCurrentPlaceId(null) }}
                >
                  <Box sx={{ width: '250px', border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.15)' }}>
                    <Box sx={{ padding: '10px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center' }}>
                      <Avatar alt={pin.username} src="/static/images/avatar/1.jpg" sx={{ marginRight: '10px' }} />
                      <Box>
                        <Typography variant='h6' color='textSecondary'>User</Typography>
                        <Typography variant='body1'>{pin.username}</Typography>
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
                </Popup>
              )
            }
          </>
        )
      }
      )
      }
      {
        turnOn && (
          <Dialog open={turnOn} onClose={() => setTurnOn(false)}>
            <DialogTitle style={{ backgroundColor: '#f5f5f5', color: '#333' }}>Rate Location</DialogTitle>
            <DialogContent>
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

        )
      }
    </Map>
  );
}
export default App;

