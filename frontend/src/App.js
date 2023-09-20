import './App.css';
import Map, { Marker } from 'react-map-gl';
const Mylongitude = 77.620231;
const Mylatitude = 13.040392234751348;
function App() {
  return (
    <div className="App">
      {/* <h1>MapBox</h1> */}
       <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      initialViewState={{
        latitude: {Mylatitude},
        longitude: {Mylongitude},
        zoom: 15,
      }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {/* <Marker longitude={Mylongitude} latitude={Mylongitude} anchor="bottom" >
      <img src="./pin.png" />
    </Marker> */}
    </Map>
    </div>
  );
}

export default App;
// REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoicHJhdGVlay13YXluZSIsImEiOiJjbG1yNmN0dncwNXkwMmttdm50N3E5OXk4In0.qSJ2M_UOqjAXi2dubu9nrw