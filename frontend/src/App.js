import './App.css';
import Map, { Marker, Popup } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { Room } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LocationRatingDialog from './components/LocationRatingDialog';
import LocationInfoPopup from './components/LocationInfoPopup';

function App() {
  const Mylongitude = 77.620231;
  const Mylatitude = 13.040392234751348;
  const [currentUsername, setCurrentUsername] = useState('');
  const [turnOn, setTurnOn] = useState(false);
  const [myPins, setMyPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  
  //UseStates for Form
  
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [zoom, setZoom] = useState(17);
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
                  <LocationInfoPopup pin={pin} />
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
          <LocationRatingDialog setTurnOn={setTurnOn} setMyPins={setMyPins} currentUsername={currentUsername} longitude={longitude} latitude={latitude} turnOn={turnOn} myPins={myPins}/>
        )
      }
    </Map>
  );
}
export default App;

