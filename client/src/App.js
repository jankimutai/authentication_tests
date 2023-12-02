import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import { Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/NavBar';
function App() {
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path="/login" element ={<Login />}/>
        <Route exact path="/register" element ={<Registration />}/>
      </Routes>
      
    </>
  );
}

export default App;
