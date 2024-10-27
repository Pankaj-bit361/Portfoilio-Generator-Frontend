import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import PortfolioGenerator from "./components/PortfolioGenerator";
import Preview from "./components/Preview";
import "./styles/index.css";
import Signup from "./pages/Signup";
import LoginSignupForm from "./pages/Login";
import { config } from "./common/config";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
                path="/generator"
                element={
                  <PortfolioGenerator setPortfolioData={setPortfolioData} />
                }
              />
              <Route
                path="/preview"
                element={<Preview portfolioData={portfolioData} />}
              />
              <Route path="/login" element={<LoginSignupForm />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
