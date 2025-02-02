import React, { useState } from "react";
import Logo from "../../components/Logo";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // for an icons --u need to write npm install heroicons

const SignIn = ({ onSignup, onSignIn, onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true); // Email validation state
  const [passwordError, setPasswordError] = useState(""); // Error message for invalid password

  // Handle email input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(value.endsWith("@iau.edu.sa")); // Validate email format
  };

  // Validate password (length and special character)
  const validatePassword = (password) => {
    return password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  // Handle password input change and validate password
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!validatePassword(value)) {
      setPasswordError("Password must be at least 8 characters & contain a special character.");
    } else {
      setPasswordError(""); // Clear error if the password is valid
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    if (!email.endsWith("@iau.edu.sa")) {
      setEmailError("Email must be a university email (@iau.edu.sa)");
      setIsValidEmail(false);
    } else {
      setEmailError("");
      setIsValidEmail(true);
    }

    // If both email and password are valid, proceed with sign-in
    if (isValidEmail && !passwordError && email && password) {
      onSignIn();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-black text-center">
        {/* Logo */}
        <div className="mb-6">
          <Logo />
        </div>

        <div className="w-full text-center">
          <div className="mb-4">
            <p className="text-white font-trap font-bold text-3xl mb-3">
              Welcome
            </p>
            <p className="text-gray-400 text-[16px] text-left leading-tight">
              Uncover the untapped potential of your growth <br />
              to connect with similar students
            </p>
          </div>

          {/* Email Input with Validation */}
          <div className="relative w-full">
            <InputField
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full mt-4 ${isValidEmail ? "border-b-2 border-blue-500" : "border-red-500"} focus:outline-none`}
            />
            {!isValidEmail && (
              <p className="text-gray-500 text-xs mt-1 text-left">
                Please enter a valid university email (iau.edu.sa)
              </p>
            )}
          </div>
          <div className="relative w-full mt-4">
            <InputField
              placeholder="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange} 
              className={`pr-10 ${passwordError ? "border-red-500" : "border-b-2 border-blue-500"} focus:outline-none`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-8 -top-1 transform translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
            {passwordError && (
              <p className="text-gray-500 text-xs mt-1 text-left">{passwordError}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center w-full mt-3 text-white text-xs">
            {/* Checkbox */}
            <label className="flex items-center space-x-1 cursor-pointer ml-10">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-3.5 h-3.5 border border-white rounded-sm cursor-pointer bg-transparent appearance-none checked:bg-transparent checked:border-white checked:before:content-['✔'] checked:before:text-white checked:before:text-sm flex items-center justify-center"
              />
              <span className="text-white ml-10 text-xs">Keep me logged in</span>
            </label>

            {/* Forgot Password */}
            <span
              className="text-white mr-10 underline cursor-pointer hover:text-white text-xs"
              onClick={onForgotPassword}
            >
              Forgot Password?
            </span>
          </div>

          {/* Sign In Button */}
          <div className="mt-6">
            <Button text="Sign In" onClick={handleSubmit} />
          </div>

          {/* Signup Redirect */}
          <div className="mt-4">
            <p className="text-white font-trap text-xs">
              Don't have an account?{" "}
              <span className="ml-1 cursor-pointer text-blue-500 font-trap" onClick={onSignup}>
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
