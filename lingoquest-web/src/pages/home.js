import React, { useState } from 'react';

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <header>
                <h4>Header</h4>
                <nav className={`navbar ${isOpen ? 'open' : ''}`}>
                    <button className="hamburger" onClick={toggleMenu}>
                        &#9776;
                    </button>
                    <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h2>Main Content</h2>

                <div className="button-container" id="menubuttons">
                    <button>Välkommen till LingoQuest</button>
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
