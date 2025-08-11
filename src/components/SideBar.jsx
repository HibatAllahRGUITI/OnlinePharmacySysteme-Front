import { useState } from 'react';
import '../styles/SideBar.css'; 
import { logoutUser } from '../services/AuthApi'
import { Link } from 'react-router-dom';


const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
        await logoutUser();
        alert('Logged out successfully!');
        window.location.href = '/Connect';
    } catch (error) {
        console.error("Logout error in sidebar:", error);
        alert('Logout failed!');
    }
};

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h3 className="brand">
          <i className="fas fa-anchor"></i>
          <span>PharmaConnect</span>
        </h3>
        <div className="toggle-btn" onClick={toggleSidebar}>
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} toggle-icon`}></i>
        </div>
      </div>
      <ul className="nav-links">
        <li>
          <div className="nav-item">
            <span className="nav-icon"><i className="fas fa-home"></i></span>
            <Link to="/admin/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
                <span>Accueil</span>
            </Link>
          </div>
        </li>

        <li>
          <div className="nav-item">
            <span className="nav-icon"><i className="fas fa-user"></i></span>
            <Link to="/admin/pharmacies" style={{ color: 'inherit', textDecoration: 'none' }}>
                <span>Pharmacies</span>
            </Link>
          </div>
        </li>
        <li>
          <div className="nav-item">
            <span className="nav-icon"><i className="fa-solid fa-chart-line"></i></span>
            <Link to="/admin/patients" style={{ color: 'inherit', textDecoration: 'none' }}>
                <span>Patients</span>
            </Link>
          </div>
        </li>
        <li>
          <div className="nav-item">
            <span className="nav-icon"><i className="fa-solid fa-chart-line"></i></span>
            <Link to="/admin/parametres" style={{ color: 'inherit', textDecoration: 'none' }}>
                <span>Paramètres</span>
            </Link>
          </div>
        </li>

        <li id='logout'>
          <a className="nav-item" onClick={handleLogout}>
            <span className="nav-icon"><i className="fas fa-home"></i></span>
            <span>Déconnecter</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;