import axios from "axios";
import { jwtDecode } from "jwt-decode";


const api = axios.create({
  baseURL: "http://localhost:8080/pharmacy-management-web",
});

// Fonction pour récupérer les pharmacies disponibles
export const fetchPharmacies = async () => {
  try {
    const response = await api.get("/admin/pharmacies");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des pharmacies:", error);
    throw error;
  }
};

// Updated function to send `multipart/form-data` request
export const uploadOrdonnance = async (formData) => {
  try {
    const response = await api.post("/ordonnance/sendFile", formData, {
      headers: {
        "Accept": "application/json",           // Accept JSON response
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'ordonnance:", error);
    throw error;
  }
};

// Fonction pour récupérer les pharmacies disponibles
export const fetchOrdonnances = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token){ 
      console.log("token not found " , token);
      throw new Error("Token not found");
    }

    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;
    console.log('patient ID ', id);
    const response = await api.get(`/ordonnance/patient/${id}`);
    return response.data;
        
    
  } catch (error) {
    console.error("Erreur lors de la récupération des ordonnances:", error);
    throw error;
  }
};

export const fetchOrdonnanceImage = async (ord_id) => {
  try {

    console.log('ordonnance ID ', ord_id);
    const response = await api.get(`/ordonnance/getFile/${ord_id}`,{
      responseType: "arraybuffer",
  });
  return btoa(
    new Uint8Array(response.data)
      .reduce((data, byte) => data + String.fromCharCode(byte), "")
  );
          
  } catch (error) {
    console.error("Erreur lors de la récupération de l'image:", error);
    throw error;
  }
};

export default api;
