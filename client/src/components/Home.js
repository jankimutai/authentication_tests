import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'

function Home() {
  const { user,logout } = useAuth();

  return (
    <div className="home">
      <h1>Welcome to the Authentication Homepage</h1>
      {user ? (
        <button className="auth-button logout-button" onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/login" className="auth-button login-button">Login</Link>
          <Link to="/register" className="auth-button register-button">Register</Link>
        </>
      )}

    </div>
  );
}

export default Home;
