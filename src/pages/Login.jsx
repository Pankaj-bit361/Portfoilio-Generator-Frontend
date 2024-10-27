
import React, { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import "./login.css";
import googleIcon from "../assets/google.svg";
import { useGoogleLogin } from '@react-oauth/google';
import { config } from "../config/api";
import { useNavigate } from "react-router-dom";

const LoginSignupForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [isSignIn, setIsSignIn] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignIn(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
    setShowOTP(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetOTP = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`${config.BASE_URL}api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formState.email })
      });
      
      if (response.ok) {
        setShowOTP(true);
      }
    } catch (error) {
      console.error('OTP Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (isSignIn && showOTP) {
        const response = await fetch(`${config.BASE_URL}api/auth/verify-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.email,
            otp: formState.otp,
          })
        });

        const data = await response.json();
        if (response.ok) {
          // Store tokens and redirect
          localStorage.setItem('accessToken', data.tokens.accessToken);
          localStorage.setItem('refreshToken', data.tokens.refreshToken);
          navigate('/generator')
        }
      }
    } catch (error) {
      console.error('Submit Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth Integration
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      
      // First, get the ID token from Google
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          'Authorization': `Bearer ${credentialResponse.access_token}`
        }
      });

      const userInfo = await response.json();

      // Now send the ID token to your backend
      const authResponse = await fetch(`${config.BASE_URL}api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: credentialResponse.access_token,
          userInfo: userInfo // Send user info directly
        })
      });

      const data = await authResponse.json();
      if (authResponse.ok) {
        localStorage.setItem('accessToken', data.tokens.accessToken);
        localStorage.setItem('refreshToken', data.tokens.refreshToken);
        navigate('/generator')

    } else {
        throw new Error(data.message || 'Google login failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => console.error('Google login failed'),
    flow: 'implicit'
  });


  
  return (
    <div id="container" className={`container ${isSignIn ? "sign-in" : "sign-up"}`}>
      <div className="row">
        {/* SIGN UP */}
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
              <div className="input-group">
                <Mail size={24} />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email"
                  value={formState.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <Lock size={24} />
                <input 
                  type="password" 
                  name="password"
                  placeholder="Password"
                  value={formState.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <Lock size={24} />
                <input 
                  type="password" 
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formState.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Sign up</button>
              <p>
                <span>Already have an account?</span>
                <b onClick={handleToggle} className="pointer">
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>

        {/* SIGN IN */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <form className="form sign-in" onSubmit={showOTP ? handleSubmit : handleGetOTP}>
              <div className="input-group">
                <Mail size={24} />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email"
                  value={formState.email}
                  onChange={handleInputChange}
                />
              </div>
              {showOTP && (
                <div className="input-group">
                  <Lock size={24} />
                  <input 
                    type="text" 
                    name="otp"
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    value={formState.otp}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <button type="submit" disabled={isLoading}>
                {showOTP ? "Verify OTP" : "Get OTP"}
              </button>

              <div className="divider">
                <span>or</span>
              </div>

              <button 
                type="button"
                onClick={() => googleLogin()}
                className="google-btn"
                disabled={isLoading}
              >
                <img src={googleIcon} alt="Google" className="google-icon" />
                Sign in with Google
              </button>

              <p>
                <span>Don't have an account?</span>
                <b onClick={handleToggle} className="pointer">
                  Sign up here
                </b>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome Back</h2>
          </div>
          <div className="img sign-in"></div>
        </div>

        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;
