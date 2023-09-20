import './App.css';
import Map, { Marker } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
function App() {
  const Mylongitude = 77.620231;
 const Mylatitude = 13.040392234751348;
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
    >
      <Marker longitude={Mylongitude} latitude={Mylatitude} anchor="bottom" >
       <PersonPinCircleIcon style={{color:'blueviolet' ,fontSize:'4rem'}}/>
      </Marker>
    </Map>

  );
}
export default App;