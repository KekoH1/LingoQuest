import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Checklist from './pages/checklist';
import './App.css';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checklist" element={<Checklist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
