import { useState, useEffect } from 'react';
import '../styles/userProfile.css'
import { getCurrentUser, updateUserProfile } from '../services/ProfileApi';
import { updatePassword, deleteUserAccount } from '../services/AuthApi'

const PharmacieProfile = () => {
  const [user, setUser] = useState({ nom: '', roleUser: '', email: '', adresse: '', avatar: '', numTel:'', type_utilisateur: '', latitude: '', longitude: '', numRegistration: '', statutPharmacie: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      console.log('UserProfile Component Token user hhhh:', currentUser);
      setUser(currentUser); 
    };

    fetchUser();
  }, []);  

  // Handle clicking the edit button to switch to editing mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to handle saving the updated user profile data
  const handleSave = async (e) => {
    e.preventDefault();

    // Create the updated user object, excluding email and roleUser (they are not editable)
    const updatedUser = {
        ...user,
        email: user.email, 
        roleUser: user.roleUser, 
        type_utilisateur: user.roleUser,
      };
    
      try {
        console.log('updatedUser :', updatedUser)
        await updateUserProfile(updatedUser); 
        console.log('User profile updated successfully', user);
        setIsEditing(false);// Switch off edit mode after successful update
      } catch (error) {
        console.error('Error updating user profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    setIsEditing(false);// Switch off edit mode
  };

  // Handle input changes in the user info fields while editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  // Handle input changes for password fields (old, new, confirm)
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

   // Function to handle password change
   const handleChangePassword = async (e) => {
    e.preventDefault();
    console.log('heyy',user.email,'heyyy  ', passwordData.oldPassword,'heyyyy ', passwordData.newPassword)
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
  
    try {

      await updatePassword(user.email, passwordData.oldPassword, passwordData.newPassword);
      alert('Password updated successfully!');
      setIsChangingPassword(false); // Close password change form
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' }); // Clear password fields

    } catch (error) {
      console.log('err',user.email,'errr', passwordData.oldPassword,'errrr', passwordData.newPassword)
      console.error('Error changing password:', error);
      alert('Failed to change password. Please try again.');
    }
    setIsChangingPassword(false);

  };
  

  // Handle clicking the "Change Password" button to switch to the password change form
  const handlePasswordEdit = () => {
    setIsChangingPassword(true);  // Switch to password change mode
  };


  const handleDeleteAccount = async () => {
    const confirmation = window.confirm("Are you sure you want to delete your account?");
    if (confirmation) {
      try {
        await deleteUserAccount(user.id);
        alert("Your account has been deleted successfully.");
        window.location.href = "/"; 

      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account. Please try again.');
      }
    }
  };

  return (
    <div className="user-profile-card">
      <div className="profile-header">
        <img src={user.avatar} className="avatar" />
        <div className="user-info">
          <h1>{user.nom}</h1>
          <p className="user-role">{user.roleUser}</p>
        </div>
      </div>
      <div className="profile-content">
        {isEditing ? (
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="name">Nom complet</label>
              <input
                type="text"
                id="name"
                name="nom"
                value={user.nom}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                disabled // Disable the email field
              />
            </div>

            <div className="form-group">
              <label htmlFor="roleUser">Role</label>
              <input
                type="text"
                id="roleUser"
                name="roleUser"
                value={user.roleUser}
                disabled // Disable the role field
              />
            </div>

            <div className="form-group">
              <label htmlFor="adresse">Adresse</label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={user.adresse}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="numTel">Numéro de téléphone</label>
              <input
                type="text"
                id="numTel"
                name="numTel"
                value={user.numTel}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="numTel">Latitude</label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={user.latitude}
                step="0.000001" 
                min="-90" 
                max="90"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="numTel">Longitude</label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                value={user.longitude}
                step="0.000001" 
                min="-180" 
                max="180"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="numTel">Numéro de registration</label>
              <input
                type="text"
                id="numRegistration"
                name="numRegistration"
                value={user.numRegistration}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-save">Save Changes</button>
          </form>
        ) : (
          <>
            <div className="info-group">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-group">
              <span className="info-label">Adresse</span>
              <span className="info-value">{user.adresse}</span>
            </div>
            <div className="info-group">
              <span className="info-label">Numéro du téléphone</span>
              <span className="info-value">{user.numTel}</span>
            </div>
            <div className="info-group">
              <span className="info-label">Latitude</span>
              <span className="info-value">{user.latitude}</span>
            </div>
            <div className="info-group">
              <span className="info-label">Longitude</span>
              <span className="info-value">{user.longitude}</span>
            </div>
            <div className="info-group">
              <span className="info-label">Numéro de registration</span>
              <span className="info-value">{user.numRegistration}</span>
            </div>
            <button onClick={handleEdit} className="btn btn-edit">Modifier Profile</button>
            <br/>
            <button onClick={handlePasswordEdit} className="btn btn-edit">Changer Mot de passe</button>
            <br/>
            {/* Conditional rendering for the Delete Account button */}
            {user.roleUser.toUpperCase() === "PHARMACIE" && (
              <button onClick={handleDeleteAccount} className="btn btn-delete">Delete Account</button>
            )}
          </>
        )}

        {isChangingPassword && (
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label htmlFor="oldPassword">Ancien Mot de passe</label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Nouveau Mot de passe</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer Nouveau Mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" className="btn btn-save">Change Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PharmacieProfile;

