import React from 'react'
import '../assets/footer.css';

const footer = () => {
  return (
   <footer> 
        <div className="footer">
            <p>&copy; 2024 LingoQuest. All rights reserved.</p>
                <div className="social-media">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook  </a>
                    <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">   X   </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">  Instagram</a>
                </div>
        </div>
    </footer>
  )
}

export default footer