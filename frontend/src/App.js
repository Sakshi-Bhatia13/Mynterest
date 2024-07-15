import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Designs from './components/Designs';
import ContestForm from './components/ContestForm';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/designs" element={<Designs />} />
        <Route path="/contest" element={<ContestForm />} />
      </Routes>
  );
}

export default App;
