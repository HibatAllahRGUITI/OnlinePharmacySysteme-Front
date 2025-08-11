import { useState } from 'react';
import '../styles/SideNavigation.css';

const SideNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="nav-toggle" onClick={toggleNav} aria-label="Toggle navigation">
        ☰
      </button>
      <nav className={`side-nav ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#profile">Profile</a></li>
          <li><a href="#settings">Settings</a></li>
          <li><a href="#help">Help</a></li>
        </ul>
      </nav>
    </>
  );
};

export default SideNavigation;

