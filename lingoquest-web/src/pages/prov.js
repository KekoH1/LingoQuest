import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/prov.css';
import Navbar from '../components/navbar';

const Prov = () => {
  return (
  
    <div>
      <Navbar />
      <nav>
        <ul className="provbutton">
          <li><Link to="/prov1">Enkel Prov</Link></li>
          <li><Link to="/prov2">Mellan Prov</Link></li>
          <li><Link to="/prov3">Svår Prov</Link></li>
        </ul>
      </nav>


            
    </div>
  );
}

export default Prov;