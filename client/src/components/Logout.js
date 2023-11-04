import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Logout() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage(data.success);
          navigate('/login')
        } else {
          setMessage(data.error);
        }
      })
      .catch((error) => {
        setMessage('An error occurred while logging out.');
      });
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
