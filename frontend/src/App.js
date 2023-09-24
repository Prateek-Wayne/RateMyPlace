import './App.css';
import Map, { Marker, Popup } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { Room } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LocationRatingDialog from './components/LocationRatingDialog';
import LocationInfoPopup from './components/LocationInfoPopup';
import { Button } from '@mui/material';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const localStorage=window.localStorage;
  const [mylongitude,setMylongitude]=useState(77.594566);
  const [mylatitude,setMylatitude]=useState(12.971599);
  const [currentUsername, setCurrentUsername] = useState(null);
  const [myPins, setMyPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  //useState for Dialog Box and Buttons 
  const [turnOn, setTurnOn] = useState(false);
  const [login,setLogin]=useState(false);
  const [register,setRegister]=useState(false);
  const handleLogout=()=>{
    setCurrentUsername(null);
    localStorage.removeItem('user');
  }
  
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [zoom, setZoom] = useState(10);
  const handleZoom = (x) => {
    setZoom(x.viewState.zoom);
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
  useEffect(() => {
    //getting user's live location
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       console.log("Original Values 1",position.coords.latitude, position.coords.longitude);
    //       console.log("Before Values 1",mylatitude,mylongitude);
    //       setMylatitude(position.coords.latitude);
    //       setMylongitude(position.coords.longitude);
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    // } else {
    //   console.error('Geolocation is not supported by this browser.');
    // }
    setCurrentUsername(localStorage.getItem('user'));
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
        longitude: mylongitude,
        latitude: mylatitude,
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
                  color: pin.username === currentUsername ? 'orange' : '#FF339B',
                  fontSize: 3 * zoom,
                  cursor: 'pointer'
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
                  <LocationInfoPopup pin={pin} />
                </Popup>
              )
            }
          </>
        )})}
      {turnOn &&currentUsername && (
          <LocationRatingDialog setTurnOn={setTurnOn} setMyPins={setMyPins} currentUsername={currentUsername} longitude={longitude} latitude={latitude} turnOn={turnOn} myPins={myPins} />
        )}
      {
        currentUsername?<Button variant='outlined' sx={{color:'#FF339B'}} onClick={handleLogout}>  Logout </Button>:
        (<div >
          <Button  variant='outlined'sx={{color:'orange'}}  onClick={()=>{setLogin(true)}} > Login </Button>
          <Button variant='outlined' sx={{color:'#FF339B'}} onClick={()=>{setRegister(true)}}>  Register </Button>
        </div>)
      }
      {login &&(<Login login={login} setLogin={setLogin} localStorage={localStorage} setCurrentUsername={setCurrentUsername} />)}
      {register && (<Register register={register} setRegister={setRegister}/>)}
    </Map>
  );
}
export default App;

