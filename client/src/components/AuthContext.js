import React, { createContext, useContext, useState, useEffect } from 'react';

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
      })
      .catch((error) => {
        console.error('Logout error:', error);
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
