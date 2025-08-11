import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { getFilteredPharmacies } from '../services/pharmacyApi'
import PropTypes from 'prop-types'; 

delete L.Icon.Default.prototype._getIconUrl;

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const SetMapCenter = ({ pharmacies }) => {
  const map = useMap();

  useEffect(() => {
    if (pharmacies.length > 0) {
      // Calculate the center of all pharmacies
      const latitudes = pharmacies.map((pharmacie) => pharmacie.latitude);
      const longitudes = pharmacies.map((pharmacie) => pharmacie.longitude);

      const centerLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
      const centerLon = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

      // Set the map's center to the calculated center
      map.setView([centerLat, centerLon], map.getZoom());
    }
  }, [pharmacies, map]);

  return null;
};


SetMapCenter.propTypes = {
  pharmacies: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      nom: PropTypes.string.isRequired,
      adresse: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function PharmaciesMap() {

  const [pharmacies, setPharmacies] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

 /* useEffect(() => {
    async function fetchData() {
      try {
        const activePharmacies = await fetchActivePharmacies();
        setPharmacies(activePharmacies);
      } catch (error) {
        console.error('Error loading pharmacies:', error);
      }
    }

    fetchData();
  }, []);*/

  
 useEffect(() => {
  async function fetchData() {
    if (!nameFilter && !statusFilter ) return; 

    try {
      const filteredPharmacies = await getFilteredPharmacies({ 
        name: nameFilter,
        status: statusFilter,
      });
      setPharmacies(filteredPharmacies);
    } catch (error) {
      console.error('Error loading pharmacies:', error);
    }
  }

  fetchData();
}, [nameFilter, statusFilter]);

  return (
    <>
    
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Filter by Name" 
          value={nameFilter} 
          onChange={(e) => setNameFilter(e.target.value)} 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '200px' }}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '200px' }}>
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
        </form>
      </div>

    <div style={{
      display: 'flex',
      justifyContent: 'center',  
      alignItems: 'center',      
      height: '100vh',           
      width: '100%'              
    }}>
    <MapContainer center={[30.4238, -9.5927]} className="leaflet-container" zoom={13} style={{ height: "500px", width: "60%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SetMapCenter pharmacies={pharmacies} />
      {pharmacies.map((pharmacie) => (
        <Marker key={pharmacie.id} position={[pharmacie.latitude, pharmacie.longitude]}>
          <Popup>
            <b>{pharmacie.nom}</b>
            <br />
            {pharmacie.adresse}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
    </>
  );
}
