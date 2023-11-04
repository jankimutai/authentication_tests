import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Home</Link></li>
        
      </ul>
      <ul className="nav-list right">
        <li><Link to="/login" className="nav-link">Login</Link></li>
        <li><Link to="/register" className="nav-link">Register</Link></li>
        <li><button className="logout-button">Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
