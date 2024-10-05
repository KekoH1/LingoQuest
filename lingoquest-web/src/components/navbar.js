import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
        <button className="hamburger" onClick={toggleMenu}>
                        &#9776;
        </button>
                   
        <ul className="nav-links" >
        <li><Link to="/">Hem</Link></li>
        <li><Link to="/checklist">Checklista</Link></li>
        <li><Link to="/theory">Teori</Link></li>
        <li><Link to="/prov">Prov</Link></li>
        <li><Link to="/statestik">statistik</Link></li>
        </ul>
        <ul className="reviewbutton" >
        <li><Link to="/review">⭐Recensioner</Link></li>
        </ul>

     </nav>
    </header>

  )
}

export default Navbar
