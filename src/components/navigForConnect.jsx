import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';


export default function Navig(){

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
            color: '#2c3e50',
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
        </div>
            <nav style={styles.nav}>
                    <button id="connect" style={styles.button}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Retour
                    </Link>
                    </button>
                </nav>
        </header>
    )
}