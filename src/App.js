import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './login/login';
import Home from './menu/home';
import MainUser from './menu/main_user';
import User from './menu/user';
import Register from './register/register';

function App() {
  return (
      <Router>
        {/* <div className='container'> */}
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user' element={<MainUser/>} />
        </Routes>
        {/* </div> */}
      </Router>

  );
}

export default App;
