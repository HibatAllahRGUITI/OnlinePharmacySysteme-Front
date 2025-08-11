// src/components/MapWithPharmacies.js
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchNearbyPharmacies, fetchActivePharmacies } from '../services/pharmacyApi'
// API Calls


// Main Component
const MapWithPharmacies = () => {
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [activePharmacies, setActivePharmacies] = useState([]);

  useEffect(() => {
    async function loadActivePharmacies() {
      try {
        const data = await fetchActivePharmacies();
        setActivePharmacies(data);
      } catch (error) {
        console.error("Error fetching active pharmacies:", error);
      }
    }
    loadActivePharmacies();
  }, []);

  // Get User Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setError("Location access denied.");
          console.error("Error fetching location:", err);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  // Fetch Nearby Pharmacies
  useEffect(() => {
    if (userLocation.lat !== null && userLocation.lon !== null) {
      async function loadNearbyPharmacies() {
        try {
          const data = await fetchNearbyPharmacies(userLocation.lat, userLocation.lon);
          setPharmacies(data);
        } catch (err) {
          console.error("Error fetching nearby pharmacies:", err);
        }
      }
      loadNearbyPharmacies();
    }
  }, [userLocation]);

  if (error) return <div>{error}</div>;
  if (userLocation.lat === null || userLocation.lon === null) return <div>Loading...</div>;

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',  
        alignItems: 'center',      
        height: '100vh',           
        width: '100%'              
      }}>
    <MapContainer center={[userLocation.lat, userLocation.lon]} zoom={13} style={{ height: "500px", width: "60%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[userLocation.lat, userLocation.lon]}>
        <Popup>You are here</Popup>
      </Marker>

      {pharmacies.map((pharmacy) => (
        <Marker key={pharmacy.id} position={[pharmacy.latitude, pharmacy.longitude]}>
          <Popup>
            <strong>{pharmacy.nom}</strong>
            <br />
            Address: {pharmacy.adresse}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
};

export default MapWithPharmacies;
