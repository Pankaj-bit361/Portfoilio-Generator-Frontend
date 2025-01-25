import React, { useState, useEffect } from "react";
import { Mail, FileText, User } from "lucide-react";
import "./login.css";
import googleIcon from "../assets/google.svg";
import { useGoogleLogin } from "@react-oauth/google";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GlassLoader from "../components/GlassLoader";
import { useAuth } from "../Context/AuthContext.jsx";
import { toast } from "react-toastify";
import Navbar from "../components/Home/Navbar.jsx";

const LoginSignupForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    name: "",
    bio: "",
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
      const response = await General.login(formState.email);
      if (response.data) {
        setShowOTP(true);
      }
    } catch (error) {
      toast.error("Error getting OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      const response = await General.signup({
        email: formState.email,
        name: formState.name,
        bio: formState?.bio || "",
      });

      if (response.success) {
        toast.success("User Created successful!");
        setIsSignIn(true);
      } else {
        toast.error("Error submitting form. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : "Error submitting form. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (isSignIn && showOTP) {
        const response = await General.verifyOTP(formState.email, otp);
        if (response.data) {
          localStorage.setItem("accessToken", response.data.tokens.accessToken);
          localStorage.setItem(
            "refreshToken",
            response.data.tokens.refreshToken
          );
          localStorage.setItem(
            "portfolioUser",
            JSON.stringify(response.data.user)
          );
          login(response.data.user, response.data.tokens);
          toast.success("Login successful!");
          navigate("/generator/create");
        } else {
          toast.error("Invalid OTP. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
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

      const authResponse = await General.googleAuth(
        credentialResponse.access_token,
        userInfoResponse.data
      );

      if (authResponse) {
        localStorage.setItem("accessToken", authResponse.tokens.accessToken);
        localStorage.setItem("refreshToken", authResponse.tokens.refreshToken);
        localStorage.setItem(
          "portfolioUser",
          JSON.stringify(authResponse.user)
        );
        login(authResponse.user, authResponse.tokens);
        toast.success("Login successful!");
        navigate("/generator/create");
      } else {
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
    <div className="bg-gradient-to-b from-gray-900 via-blue-900/20 to-black">
      <Navbar />
      <div
        id="container"
        className={`q-login-container ${isSignIn ? "sign-in" : "sign-up"}`}
      >
        {isLoading && <GlassLoader />}

        <div className="row ">
          {/* SIGN UP */}
          <div className="col align-items-center flex-col sign-up ">
            <div className="form-wrapper align-items-center">
              <div className="form sign-up bg-gray-800/50 backdrop-blur-lg rounded-xl">
                <div className="input-group">
                  <User size={24} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formState.name}
                    onChange={handleInputChange}
                  />
                </div>
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
                <div className="input-group2">
                  <FileText size={24} /> {/* Added icon for consistency */}
                  <textarea
                    name="bio"
                    placeholder="About"
                    value={formState.bio}
                    onChange={handleInputChange}
                    className="textarea-input " /* New class for specific textarea styling */
                  />
                </div>
                <button
                  className="bg-gradient-to-r from-teal-400 to-blue-500"
                  onClick={handleSignUp}
                >
                  Sign up
                </button>
                <p className="text-gray-400 gap-2 flex items-center justify-center">
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
                className="form sign-in bg-gray-800/50 backdrop-blur-lg rounded-xl "
                onSubmit={showOTP ? handleSubmit : handleGetOTP}
              >
                <div className="input-group bg-transparent">
                  <Mail size={24} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="bg-transparent border-none"
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
                        style={{
                          fontWeight: 600,
                          color: "var(--primary-color)",
                        }}
                      >
                        Resend
                      </span>
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-teal-400 to-blue-500"
                >
                  {showOTP ? "Verify OTP" : "Get OTP"}
                </button>

                <div className="divider">
                  <span>or</span>
                </div>

                <button
                  type="button"
                  onClick={() => googleLogin()}
                  className="google-btn bg-gradient-to-r from-teal-400 to-blue-500 text-white"
                  disabled={isLoading}
                >
                  <img
                    src={googleIcon}
                    alt="Google"
                    className="google-icon text-white"
                  />
                  Sign in with Google
                </button>

                <p className="text-gray-400 gap-2 flex items-center justify-center">
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
        <div className="row content-row ">
          <div className="col align-items-center flex-col ">
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
    </div>
  );
};

export default LoginSignupForm;
