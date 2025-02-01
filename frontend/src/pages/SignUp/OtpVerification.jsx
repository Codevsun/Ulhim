import React, { useRef } from "react"; //focus on the next input when a digit is entered
import Logo from "../../components/Logo";

const OtpVerification = ({ onClose, onVerify, isForgotPassword, step }) => {
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleOtpChange = (e, index) => {
    const { value } = e.target;

    //only nummeric values are enterd. if not the field will be reset to ""
    if (/[^0-9]/.test(value)) {
      e.target.value = "";
      return;
    }
//moving from one field to the next 
    if (value.length === 1 && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    }
  };
//handle deletion 
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      otpRefs[index - 1].current.focus();
    }
  };

  return (
    <>
      {/* Logo */}
      <div className="absolute top-4 left-4">
        <Logo />
      </div>

      {/*  Radial Gradient Effect 
      it gives an affect like a light or something:)*/}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1),_rgba(0,0,0,1))]"></div>
<div className="relative flex flex-col items-center justify-center w-full max-w-md p-6 text-center bg-opacity-0">

      {/* Show Progress Bar 
      <div className="w-full py-4">
        <ProgressBar steps={["Verify Email", "Details", "Done"]} currentStep={step} />
      </div>

      {/* OTP Verification Form */}
      <div className="flex items-center justify-center p-4 w-full">
        <div className="relative w-96 p-8 bg-[#16161A] rounded-lg shadow-lg text-center">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-2xl hover:text-red-500 transition-colors"
            onClick={onClose}
          >
            X
          </button>

          {/* OTP Title */}
          <h3 className="text-2xl font-semibold text-white mb-4 font-trap">
            Enter OTP
          </h3>
          {/*is it in forget password mode? based on it whats in interface will appear */}
          <p className="text-sm text-white mb-6 font-trap">
            {isForgotPassword
              ? "Please enter the One-Time Password (OTP) sent to reset your password."
              : "Please enter the One-Time Password (OTP) sent to your email to verify your account."
            }
          </p>

          {/* OTP Input Fields */}
          <div className="flex justify-center space-x-2 mb-6">
            {otpRefs.map((ref, index) => (
              <input
                key={index}
                ref={ref}
                type="tel"
                maxLength="1"
                pattern="[0-9]"
                inputMode="numeric"
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-12 h-12 text-center bg-transparent text-white border-2 border-blue-500 rounded-md focus:outline-none"
              />
            ))}
          </div>

          {/* Resend OTP */}
          <p className="text-sm text-blue-500 mb-6">
            Didn’t receive the OTP?{" "}
            <span className="cursor-pointer text-white font-trap">Resend OTP</span>
          </p>

      
          <button
            className="w-80 py-1 bg-transparent border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300"
            onClick={onVerify} 
          >
            Send
          </button>
        </div>
      
      </div>
      </div>
    </>
  );
};

export default OtpVerification;  