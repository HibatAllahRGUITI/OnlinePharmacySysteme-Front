import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/pharmacy-management-web/log/connect/user', 
});
const api_up = axios.create({
  baseURL: 'http://localhost:8080/pharmacy-management-web/log/connect', 
});

export const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
          const parts = token.split('.');
          console.log('Token parts:', parts);
          
          if (parts.length === 3) {
            const payload = parts[1];
            let decodedPayload;
            try {
              decodedPayload = atob(payload);
              console.log('Decoded Payload:', decodedPayload);
            } catch (e) {
              console.log('Error decoding payload:', e);
            }
    
            const decodedData = JSON.parse(decodedPayload);
            console.log('Decoded Data:', decodedData);

            const email = decodedData.email;

            const response = await api.get(`/${email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`  
                }
            });
            console.log("Utilisateur fetched in the api ", response.data);
            return response.data;
          }
        }
        return null;
      } catch (error) {
        console.error('Error in getCurrentUser:', error);
        return null;
      }
  };

  export const updateUserProfile = async (updatedUser) => {
    console.log('the updated user sent in the updateUserProfile function', updatedUser)

    try {
      const token = localStorage.getItem('token');

      const response = await api_up.put('/update', updatedUser, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', 
        },
        withCredentials: true
      });

      if (response.status === 200) {
      console.log('User profile updated successfully');
      alert('User profile updated successfully')
      return response.data;  
    } else {
      console.error('Failed to update user profile:', response);
      throw new Error('Failed to update user profile');
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;  
  }
};


  