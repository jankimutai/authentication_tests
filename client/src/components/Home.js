import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Authentication Homepage</h1>
      <>
      <Link to="/login" className="auth-button login-button">Login</Link>
      <Link to="/register" className="auth-button register-button">Register</Link>
      </>
      <p>This page is your gateway to the world of authentication. Choose an action below</p>
    </div>
  );
}

export default Home;