import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Registration(){
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("All fields must be filled.");
      return;
    }
    fetch('http://localhost:5555/registration', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, email, password })
    })
    .then((response) => {
      if (response.status === 201) {
        setSuccess("Registration successful! You can now log in.");
        navigate("/login")
        setError(null);

      }else if (response.status === 409) { 
        setError("Username or email already in use. Please choose different credentials.");
        setSuccess(null);
      } else if (response.status === 401) {
        setError("Invalid email or password. Please check your input.");
        setSuccess(null);
      } else {
        setError("An error occurred. Please try again later.");
        setSuccess(null); 
      }
    })
  }
  return (
    <div className="registration-form-container">
      <h2 className="form-title">Registration Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username" className="label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
        </div>
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
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
        </div>
        <button type="submit" className="submit-button">
          Register
        </button>
        <p>
          Don't have an account? <Link to="/login" className="registration-link">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;