import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import BrowserRouter as Router

import Home from '../pages/Home';


const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  );
};

export default Routers;
