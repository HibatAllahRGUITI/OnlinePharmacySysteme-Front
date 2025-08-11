import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/pharmacy-management-web/log/connect', 
});

export const sendJoinRequest = async (nom, adresse, numTel, email, roleUser, latitude, longitude, numRegistration) => {
    try {
        const dateRequested = new Date().toISOString();
        const status = 'PENDING';
        const payload = {
            nom,               
            adresse,        
            numTel,
            email,
            roleUser,
            latitude, 
            longitude,
            numRegistration, 
            dateRequested,
            status
        };
        
        console.log("Payload Sent:", payload);
        const response = await api.post('/AddJoinRequest', payload, {
            headers: {
                'Content-Type': 'application/json'  
            }
        });
        
        return response.data;

    } catch (error) {
        console.error('error while sending request:', error.response?.data || error.message);
        throw error;
    }
};