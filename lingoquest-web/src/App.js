
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import './assets/home.css';
import Navbar from './components/navbar';
import './assets/navbar.css';
import Theory from './pages/theory';
import Kap1 from './pages/kap/kap1';
import Kap2 from './pages/kap/kap2';
import Kap3 from './pages/kap/kap3';
import Kap4 from './pages/kap/kap4';
import Prov from './pages/prov';  
import Prov1 from './pages/prover/prov1';
import Prov2 from './pages/prover/prov2';
import Reviw from './pages/review';


import LabelChecklist from './pages/checklist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/navbar" element={<Navbar/>} />
        <Route path="/theory" element={<Theory/>} />
        <Route path="/checklist" element={<LabelChecklist/>} />
        <Route path="/kap1" element={<Kap1/>} />
        <Route path="/kap2" element={<Kap2/>} />
        <Route path="/kap3" element={<Kap3/>} />
        <Route path="/kap4" element={<Kap4/>} />
        <Route path="/prov" element={<Prov />} />
       <Route path="/prov1" element={<Prov1/>} />
       <Route path="/prov2" element={<Prov2/>} />
       <Route path="/review" element={<Reviw/>} />
      </Routes>
    </Router> 
    
  );
}

export default App;
