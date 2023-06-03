import React from 'react';
import NavbarHeader from './components/NavbarHeader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import UserProfile from './pages/Profile/UserProfile'
import Logindirect from './pages/Logindirect';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
    <NavbarHeader/>
    <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/profile' element={<UserProfile/>}/>
    <Route path='/logindirect' element={<Logindirect/>}/>
    <Route path='/home' element={<Home/>}/>
    </Routes>
    </Router>
  )
}

export default App