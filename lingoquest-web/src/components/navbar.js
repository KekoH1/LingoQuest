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
        <li><Link to="välkommen">Välkommen</Link></li>
        <li><Link to="theory">Teori</Link></li>
        <li><Link to="prov">Prov</Link></li>
        <li><Link to="satestik">Statestik</Link></li>
        </ul>
     </nav>
    </header>
  )
}

export default Navbar
