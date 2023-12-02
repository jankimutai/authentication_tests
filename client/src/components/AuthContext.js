import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/session_user', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchUserSession();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    fetch('http://127.0.0.1:5555/logout', {
      method: 'DELETE',
    })
      .then(() => {
        setUser(null);
        Swal.fire({
          icon: 'success',
          title: 'Logout Successful',
          text: 'You have successfully logged out!',
        });
      })
      .catch((error) => {
        console.error('Logout error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Logout Error',
          text: 'An error occurred during logout. Please try again later.',
        });
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
