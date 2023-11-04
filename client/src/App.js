import './App.css';
import { useState } from 'react';
import Login from './components/Login';
import Registration from './components/Registration';
import { Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/NavBar';
function App() {
  const [user, setUser] = useState(null); // Initialize user state

  const handleLogin = (userData) => {
    // Update the user state with the logged-in user data
    setUser(userData);
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home user={user} />} />
        <Route path="/login" element ={<Login onLogin={handleLogin} />}/>
        <Route exact path="/register" element ={<Registration />}/>
      </Routes>
      
    </>
  );
}

export default App;
