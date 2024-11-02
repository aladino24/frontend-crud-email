import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './login/Login';
import Home from './menu/home';
import MainUser from './menu/main_user';
import Register from './register/register';
import MainEmail from './emails/MainEmail';
import MainLoginHistory from './login/MainLoginHistory';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/email" element={<MainEmail />} />
          <Route path="/user" element={<MainUser />} />
          <Route path="/user/:id/login-history" element={<MainLoginHistory />} /> 
        </Routes>
      </Router>
  );
}

export default App;
