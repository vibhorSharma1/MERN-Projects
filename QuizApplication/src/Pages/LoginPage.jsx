import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = useRef([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Separate error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [fieldsRequiredError, setFieldsRequiredError] = useState("");

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // 🧠 Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("Invalid email format ❌");
        setTimeout(() => setEmailError(""), 2000);
      } else {
        setEmailError("");
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔐 Confirm Password validation
  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== formData.password) {
      setConfirmPasswordError("Passwords do not match ❌");
      setTimeout(() => setConfirmPasswordError(""), 2000);
    } else {
      setConfirmPasswordError("");
    }
  };

  // 🔢 OTP handler
  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) otpRefs.current[index + 1].focus();
      else if (!value && index > 0) otpRefs.current[index - 1].focus();
    }
  };

  // 🚀 Login / Signup handler
  const handleClick = async (e) => {
    e.preventDefault();

    // Empty field check
    if (!formData.email || !formData.password) {
      setFieldsRequiredError("All fields are required ❌");
      setTimeout(() => setFieldsRequiredError(""), 2000);
      return;
    }

    if (isLogin) {
      try {
        const res = await axios.post(`${API_URL}/login`, {
          email: formData.email,
          password: formData.password,
        });
        console.log(res.data);
        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        setPasswordError("Login failed. Invalid credentials ❌");
        setTimeout(() => setPasswordError(""), 2000);
      }
    } else {
      // Signup flow
      if (confirmPasswordError || emailError || passwordError) return;
      setShowOTP(true);
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      alert("Please enter all 4 digits");
      return;
    }
    alert(`✅ OTP Verified: ${enteredOtp}`);
    setShowOTP(false);
    setOtp(["", "", "", ""]);
  };

  const handleGoogleSignIn=()=>{
    window.location.href = `${API_URL}/auth/google`;
    

  }
  const handleGitHubSignIn=()=>{
    window.location.href = `${API_URL}/auth/github`;

  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-[#191022] to-[#110a18] p-4">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_#6A0DAD,_transparent_30%),_radial-gradient(circle_at_bottom_right,_#00FFFF,_transparent_30%)]"></div>
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#ad92c9] hover:text-white transition-all duration-300 group"
      >
        <div className="p-2 bg-[#1a1122] rounded-full group-hover:bg-primary/40 transition-all duration-300 shadow-md">
          <FaArrowLeft className="text-lg group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-sm font-medium hidden sm:inline">Back</span>
      </button>
      {/* Card */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center rounded-xl bg-[#1a1122]/80 p-8 shadow-2xl backdrop-blur-lg border border-[#2b1b3b]/80">
        {/* Toggle */}
        <div className="w-full mb-8">
          <div className="flex h-12 items-center justify-center rounded-full bg-[#362348] p-1.5">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 rounded-full px-4 py-2 text-base font-bold transition-all ${isLogin
                  ? "bg-primary text-white shadow-[0_0_10px_rgba(106,13,173,0.5)]"
                  : "text-[#ad92c9]"
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 rounded-full px-4 py-2 text-base font-bold transition-all ${!isLogin
                  ? "bg-primary text-white shadow-[0_0_10px_rgba(106,13,173,0.5)]"
                  : "text-[#ad92c9]"
                }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <p className="text-white text-4xl font-black">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </p>
          <p className="text-[#ad92c9] text-base mt-2">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <span
                  onClick={() => setIsLogin(false)}
                  className="font-bold text-secondary hover:underline cursor-pointer"
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setIsLogin(true)}
                  className="font-bold text-secondary hover:underline cursor-pointer"
                >
                  Login
                </span>
              </>
            )}
          </p>
        </div>

        {/* Inputs */}
        <div className="w-full space-y-6">
          {/* Email */}
          <div>
            <p className="text-white text-base font-medium pb-2">Email</p>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary bg-[#362348] h-14 placeholder:text-[#ad92c9] p-4 text-base"
            />
            {emailError && (
              <p className="text-[#ff6b6b] text-xs mt-1 ml-1 animate-pulse">
                ⚠️ {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <p className="text-white text-base font-medium pb-2">Password</p>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary bg-[#362348] h-14 placeholder:text-[#ad92c9] p-4 text-base"
            />
            {passwordError && (
              <p className="text-[#ff6b6b] text-xs mt-1 ml-1 animate-pulse">
                ⚠️ {passwordError}
              </p>
            )}
          </div>

          {/* Confirm Password (signup only) */}
          {!isLogin && (
            <div>
              <p className="text-white text-base font-medium pb-2">
                Confirm Password
              </p>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                className="w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary bg-[#362348] h-14 placeholder:text-[#ad92c9] p-4 text-base"
              />
              {confirmPasswordError && (
                <p className="text-[#ff6b6b] text-xs mt-1 ml-1 animate-pulse">
                  ⚠️ {confirmPasswordError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Fields required (global error) */}
        {fieldsRequiredError && (
          <p className="text-[#ff6b6b] text-xs mt-4 font-medium animate-pulse">
            ⚠️ {fieldsRequiredError}
          </p>
        )}

        {/* Buttons */}
        <div className="w-full flex flex-col items-center gap-4 mt-8">
          <button
            onClick={handleClick}
            className="w-full h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-lg font-bold shadow-[0_0_20px_rgba(106,13,173,0.6)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] hover:scale-105 transition-all"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {/* Divider */}
          <div className="relative w-full flex items-center py-2">
            <div className="flex-grow border-t border-[#362348]"></div>
            <span className="mx-4 text-[#ad92c9]">OR</span>
            <div className="flex-grow border-t border-[#362348]"></div>
          </div>

          {/* Social buttons */}
          <button className="w-full h-14 rounded-full bg-[#362348] text-white font-bold flex items-center justify-center hover:bg-primary/50 transition-all"
          onClick={handleGoogleSignIn}
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-6 h-6 mr-3"
            />
            Sign in with Google
          </button>

          <button 
          onClick={handleGitHubSignIn}
          className="w-full h-14 rounded-full bg-[#24292e] text-white font-semibold flex items-center justify-center gap-3 hover:bg-[#2f363d] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
              className="w-6 h-6"
            />
            Sign in with GitHub
          </button>
        </div>
      </div>

      {/* OTP Modal */}
      {showOTP && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
          <div className="bg-[#1a1122]/95 border border-[#362348] rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Enter Verification Code
            </h3>
            <p className="text-[#ad92c9] mb-6">
              We’ve sent a 4-digit OTP to your email.
            </p>
            <div className="flex justify-center gap-4 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  type="text"
                  value={digit}
                  maxLength="1"
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-12 h-12 text-center text-xl font-bold text-white bg-[#362348] border border-[#4b2f63] rounded-md focus:ring-2 focus:ring-primary outline-none"
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:scale-105 transition-all"
            >
              Verify OTP
            </button>
            <button
              onClick={() => setShowOTP(false)}
              className="mt-4 text-[#ad92c9] hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
