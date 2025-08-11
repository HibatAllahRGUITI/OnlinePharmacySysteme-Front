import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';


import markerIcon from 'leaflet/dist/images/marker-icon.png';
//import markerShadow from 'leaflet/dist/images/marker-shadow.png';
//import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';




const MapView = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { nom, latitude, longitude } = location.state || {};

  return (
    <Box sx={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Button
        variant="contained"
        onClick={() => navigate('/admin/pharmacies')}
        sx={{ position: 'absolute', top: 20, right: 20, zIndex: 1000 }}
      >
        Back to Table
      </Button>

      <MapContainer center={[latitude, longitude]} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]} icon={new L.Icon({ iconUrl: markerIcon })}>
          <Popup>
            <strong>{nom}</strong>
            <br />
            Latitude: {latitude}, Longitude: {longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
)};



export default MapView;
