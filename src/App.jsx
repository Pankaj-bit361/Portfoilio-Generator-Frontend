import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PortfolioGenerator from "./pages/PortfolioGenerator";
import Preview from "./components/Preview";
import "./styles/index.css";
import LoginSignupForm from "./pages/Login";
import { config } from "./config/api";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PortFolios from "./pages/PortFolios";

function App() {
  const [portfolioData, setPortfolioData] = useState(null);

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={config.REACT_APP_GOOGLE_CLIENT_ID}>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/generator/create"
                element={
                  <PortfolioGenerator
                    setPortfolioData={setPortfolioData}
                    type={"create"}
                  />
                }
              />
              <Route
                path="/generator/edit"
                element={
                  <PortfolioGenerator
                    setPortfolioData={setPortfolioData}
                    type={"edit"}
                  />
                }
              />
              <Route path="/portfolio" element={<PortFolios />} />
              <Route
                path="/preview"
                element={<Preview portfolioData={portfolioData} />}
              />
              <Route path="/login" element={<LoginSignupForm />} />
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
