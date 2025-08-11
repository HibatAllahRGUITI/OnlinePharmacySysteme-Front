import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/pharmacy-management-web/admin/joinRequests', 
});

const api_accept = axios.create({
    baseURL: 'http://localhost:8080/pharmacy-management-web/admin/joinRequests', 
});

const api_refused = axios.create({
    baseURL: 'http://localhost:8080/pharmacy-management-web/admin/joinRequests', 
});

const api_pharma = axios.create({
    baseURL: 'http://localhost:8080/pharmacy-management-web/admin/pharmacies', 
});

const api_patients = axios.create({
    baseURL: 'http://localhost:8080/pharmacy-management-web/admin/patients', 
});

const api_request_accept = axios.create({
    baseURL: 'http://localhost:8080/pharmacy-management-web/admin/acceptRequest', 
});

const api_request_reject = axios.create({
    baseURL: 'http://localhost:8080/pharmacy-management-web/admin/rejectRequest', 
});

export const getAllRequests = async () => {
    try {
        const token = localStorage.getItem('token');  
        console.log('this is the token ', token)
  
        if (!token) {
        alert("No token found. Please log in first.");
        return;
        }
        
        const response = await api.get('/', {
            headers: {
                'Authorization': `Bearer ${token}`  
            }
        });
        console.log("Liste des demandes d'integration des pharmacies:", response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error.response?.data || error.message);
        throw error;
    }
};

export const getAcceptedRequests = async () => {
    try {
        const token = localStorage.getItem('token');  
        console.log('this is the token ', token)
  
        if (!token) {
        alert("No token found. Please log in first.");
        return;
        }
        
        const response = await api_accept.get('/approved', {
            headers: {
                'Authorization': `Bearer ${token}`  
            }
        });
        console.log("Liste des demandes acceptées :", response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes acceptées :', error.response?.data || error.message);
        throw error;
    }
};

export const getRefusedRequests = async () => {
    try {
        const token = localStorage.getItem('token');  
        console.log('this is the token ', token)
  
        if (!token) {
        alert("No token found. Please log in first.");
        return;
        }
        
        const response = await api_refused.get('/refused', {
            headers: {
                'Authorization': `Bearer ${token}`  
            }
        });
        console.log("Liste des demandes refusées :", response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes refusées :', error.response?.data || error.message);
        throw error;
    }
};

export const getAllPharmacies = async () => {
    try {
        const token = localStorage.getItem('token');  
        console.log('this is the token ', token)
  
        if (!token) {
        alert("No token found. Please log in first.");
        return;
        }
        
        const response = await api_pharma.get('/', {
            headers: {
                'Authorization': `Bearer ${token}`  
            }
        });
        console.log("Liste des pharmacies:", response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des pharmacies:', error.response?.data || error.message);
        throw error;
    }
};

export const getAllPatients = async () => {
    try {
        const token = localStorage.getItem('token');  
        console.log('this is the token ', token)
  
        if (!token) {
        alert("No token found. Please log in first.");
        return;
        }
        
        const response = await api_patients.get('/', {
            headers: {
                'Authorization': `Bearer ${token}`  
            }
        });
        console.log("Liste des patients:", response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des patients:', error.response?.data || error.message);
        throw error;
    }
};

export const acceptRequest = async (id) => {
    try {
        console.log('here is the id' ,id);
        const token = localStorage.getItem('token');  
        console.log('this is the token ', token)
  
        if (!token) {
        alert("No token found. Please log in first.");
        return;
        }
        
        const response = await api_request_accept.post(`/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`  
            }
        });
        console.log("Accepter la demande ", response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'acceptation de la demande:', error.response?.data || error.message);
        throw error;
    }
};

export const rejectRequest = async (id) => {
    try {
        console.log('here is the id' ,id);
        const token = localStorage.getItem('token');  
        console.log('this is the token ', token)
  
        if (!token) {
        alert("No token found. Please log in first.");
        return;
        }
        
        const response = await api_request_reject.post(`/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`  
            }
        });
        console.log("Refus de la demande ", response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la rejection de la demande:', error.response?.data || error.message);
        throw error;
    }
};




export default api;
