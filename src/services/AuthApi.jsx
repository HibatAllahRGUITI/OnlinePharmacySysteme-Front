import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/pharmacy-management-web/log', 
});

const log_api = axios.create({
    baseURL: 'http://localhost:8080/pharmacy-management-web/log/connect/login', 
});

export const loginUser = async (mail, password) => {
    try {
        const response = await log_api.post('', { mail, password }, {
            headers: {
                'Content-Type': 'application/json',
                
            }});
        const user = response.data;

        console.log("connexion reussie the id in the log api: ", user)
        console.log("connexion reussie the id in the log api 22: ", user.id)
        
        if (user.token) {
            localStorage.setItem('token', user.token);  
            localStorage.setItem('role', user.roleUser);  
            
        }

        return user.token; 
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error; 
    }
};

export const registerUser = async (nom, email, motDePasse, numTel, adresse, roleUser, type_utilisateur) => {
    try {
        const payload = {
            nom,               
            adresse,       
            type_utilisateur, 
            numTel,
            email,
            motDePasse,
            roleUser,
        };

        console.log("Payload Sent:", payload);
        const response = await api.post('/connect/register', payload, {
            headers: {
                'Content-Type': 'application/json'  
            }
        });
        
        return response.data;

    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        throw error;
    }
};

export const updatePassword = async (email, oldPassword, newPassword) => {
    try {
        const response = await api.post('/connect/update-password', {
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

export const logoutUser = async () => {

    const token = localStorage.getItem("token"); 
    console.log('this is the token ', token)
  
    if (!token) {
      alert("No token found. Please log in first.");
      return;
    }
  
    try {
      const response = await api.post(
        '/connect/logout',
        {} ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert(response.data);  

      localStorage.removeItem("token"); 
      localStorage.removeItem("role");

      console.log('Logged out successfully');
      return response.data;

    } catch (error) {
      console.error("Logout error in authApi:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  export const deleteUserAccount = async (id) => {
    try {
        const token = localStorage.getItem("token"); 
        console.log('this is the token ', token)
    
        if (!token) {
        alert("No token found. Please log in first.");
        return;
        }

        const response = await api.delete(`/connect/delete/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        console.log("deletion response ", response)
      alert('Account deleted successfully');
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  };
  

  
export default api;