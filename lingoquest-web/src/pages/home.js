import React, { useState } from 'react';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../assets/navbar.css';
import { Link } from 'react-router-dom';

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div>
           <Navbar /> 
            <main>
                <h2>LingoQuest</h2>
                <h3>Det nya snabba sättet att lära sig nya språk</h3>
                <div>
                    <ul className="menubuttons" >
                        <li><Link to="välkommen">Välkommen</Link></li>
                        <li><Link to="theory">Teori</Link></li>
                        <li><Link to="prov">Prov</Link></li>
                        <li><Link to="statestik">Statestik</Link></li>
                    </ul>
                </div>
            </main>
            <Footer />  
        </div>
    );
}

export default Home;
