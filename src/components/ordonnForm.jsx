import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchPharmacies, uploadOrdonnance } from '../services/OrdApi2';
import '../styles/ordonnForm.css'

const OrdonnanceForm = () => {
  const [selectedPharmacie, setSelectedPharmacie] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    const loadPharmacies = async () => {
      try {
        const data = await fetchPharmacies();
        setPharmacies(data);
      } catch (error) {
        console.error("Erreur lors du chargement des pharmacies :", error);
      }
    };

    loadPharmacies();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const getPatientIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientId = getPatientIdFromToken();

    const numericPatientId = Number(patientId);
    const numericPharmacieId = Number(selectedPharmacie);

    if (!image || !numericPharmacieId || !patientId) {
      alert("Veuillez sélectionner une image, une pharmacie et être authentifié.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("pharmacieId", numericPharmacieId);
    formData.append("patientId", numericPatientId);

    try {
      await uploadOrdonnance(formData);
      alert("Ordonnance envoyée avec succès !");
    } catch (error) {
      alert("Erreur lors de l'envoi de l'ordonnance.");
      console.error(error)
    }
  };

  return (
    <div className="form-ordonnance-container">
    <div className="prescription-form-container">
        <h2 className="h2ord">Envoyer une ordonnance 📇</h2>
        <form onSubmit={handleSubmit} className="prescription-form">
        <div className="form-group">
          <label htmlFor="pharmacie" className="label-ord">Sélectionner une pharmacie :</label>
          <select
            id="pharmacie"
            value={selectedPharmacie}
            onChange={(e) => setSelectedPharmacie(e.target.value)}
            required
          >
            <option value="">-- Sélectionnez une pharmacie --</option>
            {pharmacies.length > 0 ? (
              pharmacies.map((pharma) => (
                <option key={pharma.id} value={pharma.id}>
                  {pharma.nom}
                </option>
              ))
            ) : (
              <option disabled>Aucune pharmacie disponible</option>
            )}
          </select>
          </div>
        <div className="form-group">
          <label htmlFor="image" className="label-ord">Prendre une photo ou sélectionner un fichier :</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            capture="camera"
            onChange={handleFileChange}
            required
          />
        </div>
          {preview && (
            <div className="image-preview">
              <h3>Prévisualisation :</h3>
              <img src={preview} alt="Prévisualisation" style={{ width: "200px" }} />
            </div>
          )}

          <button type="submit" className="submit-button-ord">Envoyer</button>
        </form>
      </div>
      </div>
  );
};

export default OrdonnanceForm;
