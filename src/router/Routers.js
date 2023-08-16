import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import BrowserRouter as Router

import Home from '../pages/Home';
import Generate from '../components/generator/Generator';
import GenerateThen from '../components/generatedThen/GenerateThen';


const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/generate' element={<Generate/>}/>
      <Route path='/generated-then' element={<GenerateThen/>}/>
    </Routes>
  );
};

export default Routers;
