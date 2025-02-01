import React, { useState } from "react"; //React hook used to manage the components state
import Logo from "../../components/Logo";
import Button from "../../components/Button";

const Signup = ({ onNext, onSignIn, isForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(value.endsWith("@iau.edu.sa")); //  Validate email format
  };

  const handleNextClick = () => {
    if (email.endsWith("@iau.edu.sa")) {
      onNext(); //  Only move to the next step if email is valid
    } else {
      setIsValidEmail(false); // Show error if invalid
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-black">
      {/*  Radial Gradient Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1),_rgba(0,0,0,1))]"></div>

      <div className="relative flex flex-col items-center justify-center w-full max-w-md p-6 text-center bg-opacity-0">
        {/* Logo */}
        <div className="mb-6">
          <Logo />
        </div>

        <div className="w-full text-center">
          {/* Forgot Password Mode */}
          {isForgotPassword ? (
            <>
              <div className="mb-4">
                <p className="text-white font-bold text-2xl">Verify your email</p>
                <p className="text-gray-400 text-sm mt-2 leading-tight">
                  Enter your email to receive a one-time passcode 
                  for resetting your password.
                </p>
              </div>
              
              {/* Email Input with Validation */}
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="22XXXXXXXX@iau.edu.sa"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full bg-transparent text-white p-2 border-b-2 
                  ${isValidEmail ? "border-blue-500" : "border-red-500"} 
                  focus:outline-none`}
                />
                {!isValidEmail && (
                  <p className="text-red-500 text-xs mt-1 text-left">
                    Email must be a university email (@iau.edu.sa)
                  </p>
                )}
              </div>

              <div className="mt-12">
                <Button text="Next" onClick={handleNextClick} /> {/*Proceeds only if valid */}
              </div>
            </>


//SIGNUP MODE
          ) : (
            <>
              <div className="mb-4">
                <p className="text-white font-bold text-xl">
                  Get Started With Your University Email
                </p>
              </div>

              {/* Email Input with Validation */}
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="22XXXXXXXX@iau.edu.sa"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full bg-transparent text-white p-2 border-b-2 
                  ${isValidEmail ? "border-blue-500" : "border-red-500"} 
                  focus:outline-none`}
                />
                {!isValidEmail && (
                  <p className="text-gray-500 text-xs mt-1 text-left">
                    Please enter a valid university email
                  </p>
                )}
              </div>

              <div className="mt-4">
                <p className="mr-10 text-white font-trap text-xs">
                  Already Have an Account?  
                  <span 
                    className="ml-1 cursor-pointer text-blue-500 font-trap"
                    onClick={onSignIn}  
                  >
                    Click Here
                  </span>
                </p>
              </div>

              <div className="mt-12">
                <Button text="Next" onClick={handleNextClick} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
