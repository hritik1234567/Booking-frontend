
import './App.css';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <>
    <Router>
        <Routes>
          
          <Route path="/login" element={<Login/>}/>
            
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<Dashboard/>}/> 
            
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
