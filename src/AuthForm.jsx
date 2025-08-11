import { useState } from 'react';
import './styles/AuthForm.css';
import '@fontsource/poppins/400.css'; 
import '@fontsource/poppins/700.css'; 
import Navig from './components/navigForConnect.jsx'
import { loginUser } from './services/AuthApi.jsx';
import { registerUser } from './services/AuthApi.jsx'; 
import { useNavigate } from 'react-router-dom';


export default function AuthForm() {
    const navigate = useNavigate();

    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [nom, setNom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [numTel, setNumTel] = useState('');
    const [roleUser] = useState('PATIENT');
    const [type_utilisateur] = useState('PATIENT');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignIn) {
      try {
        const token = await loginUser(email, motDePasse);
        console.log('Connexion réussie: ', token);
        alert('Connexion réussie!');

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userRole = decodedToken.role;
        console.log(userRole);
        switch (userRole) {
          case 'ADMIN':
            navigate('/admin/dashboard');
            break;
          case 'PHARMACIE':
            navigate('/pharmacie/dashboard');
            break;
          case 'PATIENT':
            navigate('/patient/dashboard');
            break;
          default:
            alert('Rôle inconnu. Veuillez contacter le support.');
        }
      } catch (error) {
        console.error('Erreur durant connexion:', error.response?.data);
        setErrorMessage(error.response?.data?.message || 'Email ou mot de passe Invalide. Veuillez réessayer.');
      }
    } else {
        const formData = {
          nom,
          email,
          motDePasse,
          numTel,
          adresse,
          roleUser,
          type_utilisateur,
        };

        console.log("Sending Registration Payload:", formData);
      try {
        const response = await registerUser(
          nom, email, motDePasse, numTel, adresse, roleUser, type_utilisateur
      );

        console.log('Inscription réussie: ', response);
        alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
        setIsSignIn(true); // Switch to login after successful registration
        setSuccessMessage('Inscription réussie. Veuillez vous connecter.');
      } catch (error) {
        console.error('Error during registration:', error.response?.data);
        setErrorMessage(error.response?.data?.message || 'Email ou mot de passe Invalie. Veuillez réessayer..');
      }
    }
    console.log(isSignIn ? 'Signing in' : 'Signing up', { nom, email, motDePasse, numTel, adresse, roleUser, type_utilisateur });
  };

  return (
    <>
    <Navig/>
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>{isSignIn ? 'Se connecter' : 'S\'inscrire'}</h2>
        <form onSubmit={handleSubmit}>
          {!isSignIn && (
            <>
            <div className="form-group">
              <label htmlFor="nom">Nom Complet</label>
              <input
                type="text"
                id="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="adresse">Adresse</label>
              <input
                type="text"
                id="adresse"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
            <label htmlFor="roleUser">Role</label>
              <input
                type="text"
                id="roleUser"
                value={roleUser}  
                readOnly 
            />
            </div>

            <div className="form-group">
              <label htmlFor="numTel">Téléphone</label>
              <input
                type="text"
                id="numTel"
                value={numTel}
                onChange={(e) => setNumTel(e.target.value)}
                required
              />
            </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="motDePasse">Mot de passe</label>
            <input
              type="password"
              id="motDePasse"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            {isSignIn ? 'Se connecter' : 'S\'inscrire'}
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button 
          onClick={() => {setIsSignIn(!isSignIn);
                          setErrorMessage('');
                          setSuccessMessage('');
                        }
          } 

          className="toggle-button"
        >
          {isSignIn 
            ? "Vous n'avez pas de compte ? Inscrivez-vous" : "Vous avez déjà un compte ? Connectez-vous"}
        </button>
      </div>
    </div>
    </>
  );
}

