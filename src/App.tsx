import React from 'react';
import './App.css';
import { CarList } from './components/CarList';
import { NavBar } from './components/NavBar';
import { Outlet } from "react-router-dom";

function App() {
  
  return (
    <div> 
      <NavBar/>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  )
}

export default App;
