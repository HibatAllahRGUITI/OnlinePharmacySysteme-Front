
import image from './assets/background.png';
import camera from './assets/camera.png';
import repertoire from './assets/repertoire.png';
import tempreel from './assets/tempsreel-modified.png';
import onlinePharma from './assets/pic.png';
import pharma1 from './assets/part1.png';
import pharma2 from './assets/pharma2.png';
import pharma3 from './assets/pharma3.png';
import pharma4 from './assets/Green-Leaf.jpg';
import  { useState } from 'react';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import { Link } from 'react-router-dom';
import NavigForHome from './components/nav.jsx'

const PharmacyLandingPage = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const styles = {

    container: {
      backgroundColor:'White',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      margin: '0 auto',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
      button: {
        backgroundColor: '#28d48c',
        color: '#fff',
        padding: '10px 20px',
        fontSize: '14px',
        cursor: 'pointer',
        borderRadius: '25px',
        transition: 'background-color 0.3s, transform 0.3s',
          
      },
      hero: {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '120vh', // Adjust height for balance
        width: '100vw', // Full width
        color: 'white',
        display: 'flex',
        flexDirection: 'row', // Arrange items horizontally
        justifyContent: 'flex-start', // Push content to the right
        alignItems: 'center', // Vertically center items
        padding: '0 50px',
    },
    heroTextContainer: {
        textAlign: 'left', // Align text to the right
        maxWidth: '900px', // Restrict width for a cleaner layout
        marginLeft: '60px',
        marginBottom: '150px',
    },
    heroTitle: {
        fontSize: '48px',
        marginBottom: '40px',
        fontFamily: 'verdana',
    },
    heroDescription: {
        fontSize: '18px',
        lineHeight: '1.5',
        marginBottom: '40px',
        fontFamily: 'Poppins, sans-serif',
      },
   
    buttonHover: {
        backgroundColor: '#28d48c',
        transform: 'scale(1.05)', 
      },
    section: {
      margin: '40px 0',
      flex: '1',
    },
    sectionTitle: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#28d48c'
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '60px',
      marginRight: '100px',
      marginLeft: '100px'
    },
    serviceCard: {
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0, 0, 255, 0.2)',
      minHeight: '200px',
      fontFamily: 'Poppins, sans-serif',

    },
    serviceCardTitle: {
        fontWeight: '700',
        fontSize: '18px', 
        color: '#2c3e50', 
        textTransform: 'uppercase', 
        letterSpacing: '0.8px', 
    },
    pharmacyJoinTitle: {
        fontWeight: '700',
        fontSize: '28px', 
        color: '#28d48c', 
        letterSpacing: '0.8px',
        fontFamily: 'Poppins, sans-serif',
    },
    pharmacyJoinParagraph: {
        fontSize: '14px',
        lineHeight: '1.5',
        marginBottom: '40px',
        fontFamily: 'Poppins, sans-serif',
        color: '#2c3e50',
    },
    pharmacyJoinContainer: { // Vertically center items
        backgroundColor: '#f4f4f5',
        padding: '100px',
        textAlign: 'left', // Align text to the right
        maxWidth: '900px', // Restrict width for a cleaner layout
        marginLeft: '60px',
        marginBottom: '150px',
        width: '50%', // Make the card take up half the page
        margin: '0 auto', // Center the card horizontally
        marginTop: '50px',
        transform: 'translateX(+50%)'
    },
    imageContainer: {
        transform: 'translateY(-15%)',
    },
    image: {
      maxWidth: '50%'  
    },
    logoImage: {
      height: '50px', 
      width: 'auto',
    },
    partenaireContainer: {
        marginLeft: '60px',
        marginRight: '60px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '100px',

    },
    partenaireImage: {
        maxWidth: '18%',
    },
      h2Underline: {
        textAlign: 'center',
        fontWeight: '700', 
        color: '#2c3e50', 
        marginBottom: '20px', 
        fontFamily: 'Poppins, sans-serif',
        fontSize: '40px',
         
      },
    footer: {
      background: '#f4f4f5',
      color: '#2c3e50',
      padding: '50px',
      textAlign: 'center',
      marginTop: '40px',
      fontFamily: 'Poppins, sans-serif',
    },
  };

  return (
    <div style={styles.container}>    
        <NavigForHome/>

        <section id="home" style={styles.hero}>
        <div style={styles.heroTextContainer}>
            <h1 style={styles.heroTitle}>Bienvenue sur PharmaConnect</h1>
            <p style={styles.heroDescription}>
            PharmaConnect est une plateforme qui facilite l&apos;envoi de vos ordonnances à la pharmacie de votre choix. 
            Que vous soyez un patient en quête de simplicité ou une pharmacie souhaitant intégrer une solution moderne, 
            PharmaConnect est là pour vous accompagner.
            </p>
            <button
                style={{
                    backgroundColor: hoveredButton === 'patients' ? '#28d48c' : 'transparent',
                    color: '#fff',
                    border: '2px solid white',
                    padding: '10px 20px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    fontFamily: 'Poppins, sans-serif',
                    borderRadius: '25px',
                    transition: 'background-color 0.3s, transform 0.3s',
                    transform: hoveredButton === 'patients' ? 'scale(1.05)' : 'scale(1)',
                    margin: '10px', // Spacing between buttons
                  }}
                  onMouseEnter={() => setHoveredButton('patients')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Link to="/Connect" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Se Conecter
                  </Link>
            </button>
            
            <button
                style={{
                    backgroundColor: hoveredButton === 'pharmacies' ? '#28d48c' : 'transparent',
                    color: '#fff',
                    border: '2px solid white',
                    padding: '10px 20px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    fontFamily: 'Poppins, sans-serif',
                    borderRadius: '25px',
                    transition: 'background-color 0.3s, transform 0.3s',
                    transform: hoveredButton === 'pharmacies' ? 'scale(1.05)' : 'scale(1)',
                    margin: '10px', // Spacing between buttons
                  }}
                  onMouseEnter={() => setHoveredButton('pharmacies')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Link to="/JoinUs" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Joigner nous
                  </Link>
            </button>
        </div>
        </section>
      

      <section id="services" style={styles.section}>
        <div style={styles.servicesGrid}>
          <div style={styles.serviceCard}>
          <img src={camera}  style={styles.logoImage} />
            <h3 style={styles.serviceCardTitle}>Transmission Sécurisée des Ordonnances en ligne</h3>
            <p>Permet aux patients de soumettre facilement leurs ordonnances sous format image via la plateforme, éliminant ainsi le besoin de déplacement et simplifiant le processus de commande.</p>
          </div>
          <div style={styles.serviceCard}>
          <img src={repertoire}  style={styles.logoImage} />
            <h3 style={styles.serviceCardTitle}>Accès à un répertoire de pharmacies partenaires</h3>
            <p>Les patients peuvent consulter un répertoire des pharmacies partenaires de la plateforme pour trouver facilement une pharmacie proche de chez eux prête à traiter leurs ordonnances. Cela simplifie la recherche et permet de s&apos;assurer que les médicaments seront disponibles rapidement.</p>
         </div>
          <div style={styles.serviceCard}>
          <img src={tempreel}  style={styles.logoImage} />
          <h3 style={styles.serviceCardTitle}>Suivi des commandes en temps réel</h3>
          <p>Recevez des notifications en temps réel sur le statut de vos ordonnances, de leur réception jusqu&apos;à leur disponibilité pour le retrait.</p>
          </div>
        </div>
      </section>

      <section id="pharmacyJoin" style={styles.pharmacyJoinContainer}>
        <div>
            <h2 style={styles.pharmacyJoinTitle}>Rejoindre PharmaConnect en tant que Partenaire</h2>
            <p style={styles.pharmacyJoinParagraph}>Les pharmacies intéressées à rejoindre notre réseau de partenaires peuvent soumettre une demande d&apos;adhésion. En tant que pharmacie partenaire, vous pourrez faciliter le traitement des ordonnances envoyées par les patients et offrir un service moderne et sécurisé.</p>
            <button id="PharmacyToJoinButton" style={styles.button}>
              <Link to="/JoinUs" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Joigner nous
              </Link>
            </button>
        </div>
      </section>

      <section style={styles.imageContainer}>
        <div>
            <img src={onlinePharma}  style={styles.image} />
        </div>
      </section>

      <section id ="partenaires">
        <h2 style={styles.h2Underline}>Nos Partenaires</h2>
        <br />
        
        <div style={styles.partenaireContainer}>
        <img src={pharma1} style={styles.partenaireImage}/>
        <img src={pharma2} style={styles.partenaireImage}/>
        <img src={pharma3} style={styles.partenaireImage}/>
        <img src={pharma4} style={styles.partenaireImage}/>
        </div>
      </section>


      <footer style={styles.footer} id="footer">
      <h2 style={styles.sectionTitle}>Contactez nous sur</h2>
        <p>Email : PharmaConnect@gmail.com</p>
        <br />
        <p>&copy; 2024 PharmaConnect. Tous droits résérvés.</p>
      </footer>
    </div>
  );
};

export default PharmacyLandingPage;

