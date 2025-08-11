import { useState } from 'react';
import './styles/JoinForm.css';
import '@fontsource/poppins/400.css'; 
import '@fontsource/poppins/700.css';
import Navig from './components/navigForConnect.jsx'
import { sendJoinRequest } from './services/JoinAPI.jsx';

function JoinForm(){

    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [numTel, setNumTel] = useState('');
    const [roleUser] = useState('PHARMACIE');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [numRegistration, setNumRegistration] = useState('');
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
          nom,
          adresse,
          numTel,
          email,
          roleUser,
          latitude,
          longitude,
          numRegistration,
        };

        console.log("Sending Registration Payload:", formData);
      try {
        const response = await sendJoinRequest(
          nom,
          adresse,
          numTel,
          email,
          roleUser,
          latitude,
          longitude,
          numRegistration,
      );

        console.log('Demande envoyée: ', response);
        alert('Demande envoyée.');
        
      } catch (error) {
        console.error('Error during registration:', error.response?.data);
        
      }
      };


    return (
        <>
        <Navig/>
        <div className="auth-container-join">
          <div className="auth-form-container">
            <h2>demande d&apos;integrer la plateforme</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nom">Nom de la pharmacie</label>
                <input
                  type="text"
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="adresse">Adresse</label>
                <input
                  type="text"
                  id="adresse"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="latitude">Latitude</label>
                <input
                  type="number"
                  id="latitude"
                  name="latitude"
                  value={latitude}
                  step="0.000001" 
                  min="-90" 
                  max="90"
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="longitude">Longitude</label>
                <input
                  type="number"
                  id="longitude"
                  name="longitude"
                  value={longitude}
                  step="0.000001" 
                  min="-180" 
                  max="180"
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="numTel">Téléphone</label>
                <input
                  type="text"
                  id="numTel"
                  name="numTel"
                  value={numTel}
                  onChange={(e) => setNumTel(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="numRegistration">Numéro de registration</label>
                <input
                  type="text"
                  id="numRegistration"
                  name="numRegistration"
                  value={numRegistration}
                  onChange={(e) => setNumRegistration(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="roleUser"
                  name="roleUser"
                  value={roleUser}
                  readOnly
                  hidden
                />
              </div>

              <button type="submit" className="submit-button">
                Envoyer la demande
              </button>
            </form>
              
          </div>
        </div>
        </>
      );
}

export default JoinForm;