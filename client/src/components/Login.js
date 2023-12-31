import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import Swal from 'sweetalert2';

function Login({ handleLogIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'All fields must be filled.',
      });
      return;
    }
    fetch('http://127.0.0.1:5555/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have successfully logged in!',
          });
          setLoading(false);
          return response.json();
        } else if (response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: 'Incorrect email or password. Please try again.',
          });
          setLoading(false);
        } else if (response.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'User Not Found',
            text: 'User not found.',
          });
          setLoading(false);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred. Please try again later.',
          });
          setLoading(false);
        }
      })
      .then((userData) => {
        setEmail('');
        setPassword('');
        login(userData);
        navigate('/');
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register" className="registration-link">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
