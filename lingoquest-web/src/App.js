import './App.css';
import Home from './pages/home';
import './assets/home.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Navbar from './components/navbar';
import './assets/navbar.css';
import Theory from './pages/theory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/navbar" element={<Navbar/>} />
        <Route path="/theory" element={<Theory/>} />
      </Routes>
    </Router> 
    
  );
}

export default App;
