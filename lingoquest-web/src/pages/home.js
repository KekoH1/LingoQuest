import React, { useState } from 'react';

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
 
     
    return (
        <div>
            <header>
                <nav className={`navbar ${isOpen ? 'open' : ''}`}>
                    <button className="hamburger" onClick={toggleMenu}>
                        &#9776;
                    </button>
                   
                    <ul className="nav-links">
                        <li><a href="#välkommen" className={isOpen ? 'show' : ''}>Välkommen</a></li>
                        <li><a href="#historia" className={isOpen ? 'show' : ''}>Historia</a></li>
                        <li><a href="#prov" className={isOpen ? 'show' : ''}>Prov</a></li>
                        <li><a href="#statestik" className={isOpen ? 'show' : ''}>Statestik</a></li>
                    </ul>

                </nav>
            </header>
            <main>
                <h2>Main Content</h2>

                <div className="button-container" id="menubuttons">
                    <button a href="#välkommen" >Välkommen till LingoQuest</button>
                    <button>Historia</button>
                    <button>Prov</button>
                    <button>Statestik</button>
                </div>
            </main>
            


            <footer>
                <div className="footer-content">
                    <p>&copy; 2024 LingoQuest. All rights reserved.</p>
                    <div className="social-media">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">X</a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
