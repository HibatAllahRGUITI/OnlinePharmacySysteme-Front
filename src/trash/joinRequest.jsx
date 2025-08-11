import { useState } from "react";
import Navig from '../components/navigForConnect.jsx'
import './styles/AuthForm.css';
import '@fontsource/poppins/400.css'; 
import '@fontsource/poppins/700.css'; 


const JoinRequest = () => {
  const [pharmacyName, setPharmacyName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [regist, setRegist] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*try {
      await axios.post("/api/join-request", { pharmacyName, email, address });
      alert("Your request has been submitted!");
    } catch (error) {
      console.error(error);
      alert("Failed to submit the request.");
    }*/
  };

  return (
    <>
    <Navig/>
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Joigner Nous</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nom de pharmacie</label>
                    <input
                        type="text"
                        value={pharmacyName}
                        onChange={(e) => setPharmacyName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Addresse</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Latitude</label>
                    <input
                        type="number"
                        value={lat}
                        step="0.0001"
                        min="-90"
                        max="90"
                        onChange={(e) => setLat(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Longitude</label>
                    <input
                        type="number"
                        value={long}
                        step="0.0001" 
                        min="-180"
                        max="180"
                        onChange={(e) => setLong(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Nombre de registration</label>
                    <input
                        type="text"
                        value={regist}
                        onChange={(e) => setRegist(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
        </div>
        
    </>
  );
};

export default JoinRequest;
