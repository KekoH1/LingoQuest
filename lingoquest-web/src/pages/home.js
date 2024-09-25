import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../assets/home.css"

function Home() {
    
 
     
    return (
        <div>

            <main>
                <h2>Main Content</h2>

                <div className="button-container" id="menubuttons">
                    <Link to="/checklist"><button>Välkommen till LingoQuest</button></Link>
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
