import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { fetchPharmacies, uploadOrdonnance } from "./services/OrdApi";

const OrdonnanceUploader = () => {
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
      console.log('here i am ', decodedToken)
      console.log('hmm id ? ', decodedToken.id)
      return decodedToken.id;
    }
    return null;
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientId = getPatientIdFromToken();

    const numericPatientId = Number(patientId);
    const numericPharmacieId = Number(selectedPharmacie);

    console.log("Patient ID (Type):", typeof numericPatientId, numericPatientId);
    console.log("Pharmacie ID (Type):", typeof numericPharmacieId, numericPharmacieId);
    console.log("Image:", image);

    console.log("Patient ID:", patientId);
    console.log("Image:", image);
    console.log("Selected Pharmacie ID:", selectedPharmacie);

    if (!image || !numericPharmacieId || !patientId) {
      alert("Veuillez sélectionner une image, une pharmacie et être authentifié.");
      return;
    }

    try {
      const imageBase64 = await convertImageToBase64(image);

      const payload = {
        imageBase64,
        patientId,
        pharmacieId: numericPharmacieId,
      };

      await uploadOrdonnance(payload);
      alert("Ordonnance envoyée avec succès !");
    } catch (error) {
      alert("Erreur lors de l'envoi de l'ordonnance.");
      console.log("hsgsghs", error)
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "400px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Envoyer une ordonnance</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="pharmacie">Sélectionner une pharmacie :</label>
          <select
            id="pharmacie"
            value={selectedPharmacie}
            onChange={(e) => setSelectedPharmacie(e.target.value)}
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

          <label htmlFor="image">Prendre une photo ou sélectionner un fichier :</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            capture="camera"
            onChange={handleFileChange}
          />

          {preview && (
            <div>
              <h3>Prévisualisation :</h3>
              <img src={preview} alt="Prévisualisation" style={{ width: "200px" }} />
            </div>
          )}

          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default OrdonnanceUploader;
