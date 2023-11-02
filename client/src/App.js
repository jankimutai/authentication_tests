import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import { Route,Routes } from 'react-router-dom';
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element ={<Login />}/>
        <Route exact path="/" element ={<Registration />}/>
      </Routes>
      
    </>
  );
}

export default App;
