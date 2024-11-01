import React, { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import "./login.css";
import googleIcon from "../assets/google.svg";
import { useGoogleLogin } from "@react-oauth/google";
import OTPInput from "react-otp-input";
import { config } from "../config/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader1 from "../components/GlassLoader";
import GlassLoader from "../components/GlassLoader";
import { useAuth } from "../Context/AuthContext.jsx";
import { toast } from "react-toastify";

const LoginSignupForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignIn(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
    setShowOTP(false);
    setOtp("");
    setFormState({
      email: "",
      password: "",
      confirmPassword: "",
    });
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
      const response = await axios.post(`${config.BASE_URL}api/auth/login`, {
        email: formState.email,
      });

      if (response.data) {
        setShowOTP(true);
      }
    } catch (error) {
      toast.error("Error getting OTP. Please try again.");
      console.error("OTP Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (isSignIn && showOTP) {
        const response = await axios.post(
          `${config.BASE_URL}api/auth/verify-otp`,
          {
            email: formState.email,
            otp: otp,
          }
        );
        if (response.data) {
          localStorage.setItem(
            "accessToken",
            response.data.data.tokens.accessToken
          );
          localStorage.setItem(
            "refreshToken",
            response.data.data.tokens.refreshToken
          );
          console.log(response.data.data.user);
          localStorage.setItem(
            "portfolioUser",
            JSON.stringify(response.data.data.user)
          );
          console.log(response.data.data.tokens);
          login(response.data.data.user, response.data.data.tokens);
          toast.success("Login successful!");
          navigate("/generator");
        }else{
          toast.error("Invalid OTP. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
      console.error("Submit Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);

      const userInfoResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${credentialResponse.access_token}`,
          },
        }
      );

      const authResponse = await axios.post(
        `${config.BASE_URL}api/auth/google`,
        {
          token: credentialResponse.access_token,
          userInfo: userInfoResponse.data,
        }
      );
      if (authResponse.data) {
        localStorage.setItem(
          "accessToken",
          authResponse.data.tokens.accessToken
        );
        localStorage.setItem(
          "refreshToken",
          authResponse.data.tokens.refreshToken
        );
        localStorage.setItem(
          "portfolioUser",
          JSON.stringify(authResponse.data.user)
        );
        console.log(authResponse.data.tokens);
        login(authResponse.data.user, authResponse.data.tokens);
        toast.success("Login successful!");
        navigate("/generator");
      }else{
        toast.error("Error logging in. Please try again.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Error logging in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => console.error("Google login failed"),
    flow: "implicit",
  });

  return (
    <div
      id="container"
      className={`container ${isSignIn ? "sign-in" : "sign-up"}`}
    >
      {isLoading && <GlassLoader />}

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
            <form
              className="form sign-in"
              onSubmit={showOTP ? handleSubmit : handleGetOTP}
            >
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
                <div className="flex flex-col q-justify-center items-center gap-4 my-4">
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                    focusStyle={{
                      border: "2px solid #3b82f6",
                    }}
                    className="q-justify-center"
                    shouldAutoFocus
                    inputType="tel"
                  />
                  <p className="text-sm text-gray-500 text-left mt-2">
                    Didn't receive code?{" "}
                    <span
                      type="button"
                      onClick={handleGetOTP}
                      className="text-sm text-voilet-400"
                      disabled={isLoading}
                      style={{ fontWeight: 600, color: "var(--primary-color)" }}
                    >
                      Resend
                    </span>
                  </p>
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
