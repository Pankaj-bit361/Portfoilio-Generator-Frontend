
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import PortfolioGenerator from './components/PortfolioGenerator';
import Preview from './components/Preview';
import './styles/index.css';

function App() {
  const [portfolioData, setPortfolioData] = useState(null);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/generator" 
              element={<PortfolioGenerator setPortfolioData={setPortfolioData} />} 
            />
            <Route 
              path="/preview" 
              element={<Preview portfolioData={portfolioData} />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;