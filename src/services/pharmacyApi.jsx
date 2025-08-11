import axios from "axios";
import { jwtDecode } from "jwt-decode";



const api = axios.create({
  baseURL: "http://localhost:8080/pharmacy-management-web",
});



export const fetchActivePharmacies = async () => {
  try{
    const token = localStorage.getItem('token');  
        console.log('this is the token ', token)
  
        if (!token) {
        alert("No token found. Please log in first.");
        return;
        }

    const response = await api.get("/pharmacie/active", {
      headers: {
        'Authorization': `Bearer ${token}`  
    }});

    console.log('pharmacies actives: ', response.data)
    return response.data;
  }catch(error){
    console.error("Erreur lors de la récupération des pharmacies actives:", error);
    throw error;
  }
};
  
export const fetchNearbyPharmacies = async (lat, lon, maxDistanceKm = 60) => {
  try{
    const token = localStorage.getItem('token');  
        console.log('this is the token ', token)
  
        if (!token) {
        alert("No token found. Please log in first.");
        return;
        }


    const response = await api.get(`/pharmacie/nearby?latitude=${lat}&longitude=${lon}&maxDistanceKm=${maxDistanceKm}`, {
      headers: {
        'Authorization': `Bearer ${token}`  
    }});
    console.log('pharmacies actives: ', response.data)
    return response.data;
  }catch(error){
    console.error("Erreur lors de la récupération des pharmacies à proximité:", error);
    throw error;
  }
};

export const updatePharmacyStatus = async (id) => {
  try {
    const token = localStorage.getItem('token');  
    console.log('this is the token ', token)

    if (!token) {
    alert("No token found. Please log in first.");
    return;
    }

    const response = await api.put(
      `/pharmacie/${id}/update-status`, 
      null, 
      {
        headers: {
          'Authorization': `Bearer ${token}`  
        }
      }
    );

    if (!response.data) {
      throw new Error('No data returned from status update');
    }

    console.log('updated pharmacie: ', response.data)

    return response.data;
  } catch (error) {
    console.error('Error updating pharmacy status:', error);
    throw error;
  }
}




/*export const getFilteredPharmacies = async ({ name, status, latitude, longitude, maxDistance }) => {

  const token = localStorage.getItem('token');   
    console.log('this is the token ', token)

    if (!token) {
    alert("No token found. Please log in first.");
    return;
    }

  try {
    const response = await api.get('/pharmacie/filter', {
      params: {
        name,
        status,
        latitude,
        longitude,
        maxDistance,
      }} , {
        headers: {
          'Authorization': `Bearer ${token}`  
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered pharmacies:', error);
    throw error;
  }
};*/

export const getFilteredPharmacies = async (filters) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required.');

    const params = new URLSearchParams();
    if (filters.name) params.append('name', filters.name);
    if (filters.status) params.append('status', filters.status);
    if (filters.distance) params.append('distance', filters.distance);
    if (filters.zone) params.append('zone', filters.zone);

    const response = await api.get('/pharmacie/filter2?' + params.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching filtered pharmacies:', error);
    throw error;
  }
};

export const getOrdonnanceToTreat = async () => {
  try{
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required.');

    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;
    console.log('pharmacie ID ', id);

    const response = await api.get(`/ordonnance/pharmacie/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;

  }catch(error){
    console.error("erreur while fetching ordonnances to treat ", error)
  }
}

export const updateOrdonnanceStatus = async (id, newStatus) => {
  try{
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required.');
    console.log('this is the newstatus object and what it holds', newStatus)

    const response = await api.put(`/ordonnance/update-ordonnance-status/${id}`,
      JSON.stringify(newStatus.trim()),  // Send the new status in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
  });
    return response.data;

  }catch(error){
    console.error("erreur while updating ordonnance to treat ", error)
  }
}

export const getOrdonnanceTraitee = async () => {
  try{
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required.');

    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;
    console.log('pharmacie ID ', id);

    const response = await api.get(`/ordonnance/pharmacie/${id}/traitee`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;

  }catch(error){
    console.error("erreur while fetching ordonnances traitees ", error)
  }
}

export const getOrdonnanceRejected = async () => {
  try{
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required.');

    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;
    console.log('pharmacie ID ', id);

    const response = await api.get(`/ordonnance/pharmacie/${id}/rejected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;

  }catch(error){
    console.error("erreur while fetching ordonnances rejected ", error)
  }
}

export const getOrdonnanceEnCours = async () => {
  try{
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required.');

    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;
    console.log('pharmacie ID ', id);

    const response = await api.get(`/ordonnance/pharmacie/${id}/cours`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;

  }catch(error){
    console.error("erreur while fetching ordonnances en cours de traitement ", error)
  }
}

export const getOrdonnanceSoumise = async () => {
  try{
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required.');

    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;
    console.log('pharmacie ID ', id);

    const response = await api.get(`/ordonnance/pharmacie/${id}/soumise`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;

  }catch(error){
    console.error("erreur while fetching ordonnances soumises ", error)
  }
}


export default api;

  