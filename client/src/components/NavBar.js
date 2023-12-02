import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../components/AuthContext';
import UserProfile from './UserProfile'; // Import the UserProfile component
import '../Styles/navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const [isProfileHovered, setProfileHovered] = useState(false);

  const handleProfileMouseEnter = () => {
    setProfileHovered(true);
  };

  const handleProfileMouseLeave = () => {
    setProfileHovered(false);
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
      </ul>
      {user ? (
        <div className="nav-list right" onMouseEnter={handleProfileMouseEnter} onMouseLeave={handleProfileMouseLeave}>
          <ul>
            <button className="logout-button" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</button>
          </ul>
          <div className={`user-profile-dropdown ${isProfileHovered ? 'show' : ''}`}>
            <p>Welcome, {user.username}</p>
            {isProfileHovered && <UserProfile />}
          </div>
        </div>
      ) : (
        <ul className="nav-list right">
          <li><Link to="/login" className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link></li>
          <li><Link to="/register" className="nav-link"><FontAwesomeIcon icon={faUserPlus} /> Register</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
