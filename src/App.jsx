import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PortfolioGenerator from "./pages/PortfolioGenerator";
import Preview from "./components/Preview";
import "./styles/index.css";
import Signup from "./pages/Signup";
import LoginSignupForm from "./pages/Login";
import { config } from "./config/api";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./Context/AuthContext.jsx";
import PrivateRoute from "./Context/PrivateRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PortFolios from "./pages/PortFolios";

function App() {
  const [portfolioData, setPortfolioData] = useState(null);

  return (
    <BrowserRouter>
      <AuthProvider>
        <GoogleOAuthProvider clientId={config.REACT_APP_GOOGLE_CLIENT_ID}>
          <div className="app">
            <ToastContainer />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginSignupForm />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/generator/create"
                  element={
                    <PrivateRoute>
                      <PortfolioGenerator setPortfolioData={setPortfolioData}  type={'create'}  />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/generator/edit"
                  element={
                    <PrivateRoute>
                      <PortfolioGenerator setPortfolioData={setPortfolioData} type={'edit'} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/preview"
                  element={
                    <PrivateRoute>
                      <Preview portfolioData={portfolioData} />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </GoogleOAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
