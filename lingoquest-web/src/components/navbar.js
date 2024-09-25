import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
  return (
    <div>
      <header>
        <nav className={`navbar ${isOpen ? "open" : ""}`}>
          <button className="hamburger" onClick={toggleMenu}>
            &#9776;
          </button>

          <ul className="nav-links">
            <li>
              <Link to="/checklist" className={isOpen ? "show" : ""}>
                Välkommen
              </Link>
            </li>
            <li>
              <a href="#historia" className={isOpen ? "show" : ""}>
                Historia
              </a>
            </li>
            <li>
              <a href="#prov" className={isOpen ? "show" : ""}>
                Prov
              </a>
            </li>
            <li>
              <a href="#statestik" className={isOpen ? "show" : ""}>
                Statestik
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
