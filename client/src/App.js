import logo from './logo.svg';
import './App.css';

import Header from './Components/partials/Header.jsx';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Components/Home.jsx';
import Register from './Components/Register.jsx';
import Login from './Components/Login.jsx';
import { useState } from 'react';
function App() {

  return <>
  <BrowserRouter>
  {/* <Header/> */}
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login />}/>

  </Routes>
  
  </BrowserRouter>
  
  </>
}

export default App;
