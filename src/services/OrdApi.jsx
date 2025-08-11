import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/pharmacy-management-web',
});

const api_pharm = axios.create({
    baseURL: 'http://localhost:8080/pharmacy-management-web/admin/pharmacies',
});



// Fonction pour mettre à jour le mot de passe
export const updatePassword = async (email, oldPassword, newPassword) => {
    try {
        const response = await api.post('/', {
            email,
            oldPassword,
            newPassword
        });
        return response.data;
    } catch (error) {
        console.error('Error during password update:', error.response?.data || error.message);
        throw error;
    }
};

// Fonction pour récupérer les pharmacies disponibles
export const fetchPharmacies = async () => {
    try {
        const response = await api_pharm.get("/");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des pharmacies:", error);
        throw error;
    }
};

export const uploadOrdonnance = async (payload) => {
    try {
        console.log("Full Payload:", JSON.stringify(payload));
        console.log("Payload Types:", {
            patientId: typeof payload.patientId,
            pharmacieId: typeof payload.pharmacieId,
            imageBase64: typeof payload.imageBase64
        });
        const response = await api.post("/ordonnance/send", payload, {
            headers: { "Content-Type": "application/json",
                        "Accept": "application/json"
             },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'ordonnance:", error);
        throw error;
    }
};

export default api;
