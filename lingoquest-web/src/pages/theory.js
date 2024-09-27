import React from 'react'
import Navbar from '../components/navbar'
import '../assets/theory.css'

function theory() {
  return (
    <div>
        <Navbar />
        <main>
            <h2>Teori</h2>
            <p>Det finns många olika sätt att lära sig nya språk</p>
            <p>Här hittar du olika kapitel som ger dig djupare förståelse för ditt nya språk</p>
            <p>Välj ett av kapitlen och börja läs på</p>
            <p>Lycka till!</p>
            <div>
                <ul className="menubuttons" >
                    <li><a href="kap1">Kapitel 1. Historia</a></li>
                    <li><a href="kap2">Kapitel 2. Morderna Språket</a></li>
                    <li><a href="kap3">Verb</a></li>
                    <li><a href="kap4">Sammanfattning</a></li>
                </ul>
            </div>


        </main>





    </div>
  )
}

export default theory