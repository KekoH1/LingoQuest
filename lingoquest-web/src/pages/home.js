import React from 'react'

function home() {
  return (
    <div>
        <header>
        <h4>Header</h4>
    </header>
    <main>
        <h2>Main Content</h2>

        <div class="button-container" id="menubuttons">
            <button>Välkommen till LingoQuest</button>
            <button>Historia</button>
            <button>Prov</button>
            <button>Statestik</button>
        </div>
    </main>
   
<footer>
    <div class="footer-content">
        <p>&copy; 2023 LingoQuest. All rights reserved.</p>
        <div class="social-media">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"> Twitter </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
        </div>
    </div>
</footer>
        
    </div>
  )
}

export default home