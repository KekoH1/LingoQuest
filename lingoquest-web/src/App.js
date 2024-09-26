import './App.css';
import Home from './pages/home';
import './assets/home.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Navbar from './components/navbar';
import './assets/navbar.css';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/navbar" element={<Navbar/>} />
        {/* <Route path="/footer" element={<Footer/>} /> */}
      </Routes>
    </Router> 
    
  );
}

export default App;
