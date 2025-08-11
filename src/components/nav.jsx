import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';


export default function NavigForHome(){

    const styles ={
        nav: {
            display: 'flex',
            gap: '40px',
            marginRight: '100px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px',
            alignItems: 'baseline',
          },
          navLink: {
            color: 'white',
            textDecoration: 'none',
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
          header: {
            backgroundColor: 'transparent',
            padding: '20px 0 20px 0',
            color: '#16537e',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: '1000',
            width: '100%',
            top: '0',
            
          },
          logoContainer: {
            display: 'flex',
            alignItems: 'center', // Aligns logo and text vertically
            gap: '10px', // Adds space between the logo and the text
            marginLeft: '100px',
          },
          logo: {
            fontSize: '28px',
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'Gill Sans MT',
    
          },
          logoImage: {
            height: '50px', 
            width: 'auto',
          },
    }
    return(
        <header style={styles.header}>
        <div style={styles.logoContainer}>
            <img src={logo} alt="PharmaConnect Logo" style={styles.logoImage} />
            <div style={styles.logo}>PharmaConnect</div>
            <Link to="/Map" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Voir Map
                    </Link>
        </div>
            <nav style={styles.nav}>
                    
                    <a href="#home" style={styles.navLink}>Home</a>
                    <a href="#services" style={styles.navLink}>Services</a>
                    <a href="#pharmacyJoin" style={styles.navLink}>Nous Rejoindre</a>
                    <a href="#partenaires" style={styles.navLink}>Nos Partenaires</a>
                    <a href="#footer" style={styles.navLink}>Contact Us</a>
                    <button id="connect" style={styles.button}>
                    <Link to="/Connect" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Se Conecter
                    </Link>
                    </button>
                </nav>
        </header>
    )
}