import React, { useState } from "react";
import Signup from "./pages/SignUp/Signup";
import SignIn from "./pages/SignIn/SignIn";
import OtpVerification from "./pages/SignUp/OtpVerification";
import Details from "./pages/SignUp/Detailes";
import SuccessScreen from "./pages/SignUp/SuccessScreen";
import MajorSelection from "./pages/SignUp/MajorSelection";
import YearSelection from "./pages/SignUp/YearSelection";
import SkillSelection from "./pages/SignUp/SkillsSelection";
import Interests from "./pages/SignUp/interest";
import ResetPassword from "./pages/SignIn/ResetPassword";
import ProgressBar from "./components/Progressbar"; 

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignInMode, setIsSignInMode] = useState(false); 
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  const goToNextStep = () => setCurrentStep(currentStep + 1);
  
  const goToSignup = () => {
    setIsSignIn(false);
    setIsSignInMode(false);  
    setIsForgotPassword(false);
    setIsOtpSent(false);
    setIsResetPassword(false);
    setCurrentStep(0);
  };

  const goToSignIn = () => {
    setIsSignIn(true);
    setIsSignInMode(false);  
    setIsForgotPassword(false);
    setIsOtpSent(false);
    setIsResetPassword(false);
  };

  const goToSignupFromSignIn = () => {
    setIsSignIn(false);
    setIsSignInMode(true);  
    setCurrentStep(0);
  };

  const goToForgotPassword = () => {
    setIsForgotPassword(true);
    setIsSignIn(false);
    setIsOtpSent(false);
    setIsResetPassword(false);
  };

  const goToOtpVerification = () => {
    setIsOtpSent(true);
  };

  const goToResetPassword = () => {
    setIsResetPassword(true);
  };

 
  const getProgressStep = () => {
    if (currentStep === 1) return 0; // OTP - Verify Email
    if (currentStep >= 2 && currentStep <= 6) return 1; // Details, Year, Major, Interests, Skills
    if (currentStep === 7) return 2; // Success Screen - Done
    return 0; // Default (Signup Page)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black font-trap overflow-auto">
      {isSignIn ? (
        <SignIn 
          onSignup={goToSignupFromSignIn} 
          onSignIn={goToOtpVerification} 
          onForgotPassword={goToForgotPassword} 
        />
      ) : (
        <>
          {!isForgotPassword && currentStep > 0 && (
            <div className="w-full py-4 mt-2"> 
              <ProgressBar steps={["Verify Email", "Details", "Done"]} currentStep={getProgressStep()} />
            </div>
          )}

          {isForgotPassword ? (
            isResetPassword ? (
              <ResetPassword />
            ) : isOtpSent ? (
              <OtpVerification 
                onVerify={goToResetPassword} 
                onClose={goToForgotPassword}
                goToSignup={goToSignup}
                isForgotPassword={true}
              />
            ) : (
              <Signup onNext={goToOtpVerification} isForgotPassword={isForgotPassword} />
            )
          ) : (
            <>
              {/* If in SignInMode, Signup renders with changed UI */}
              {currentStep === 0 && (
                <Signup onNext={goToNextStep} onSignIn={goToSignIn} isSignInMode={isSignInMode} />
              )}
              {currentStep === 1 && <OtpVerification onVerify={goToNextStep} goToSignup={goToSignup} />}
              {currentStep === 2 && <Details onNext={goToNextStep} />}
              {currentStep === 3 && <YearSelection onNext={goToNextStep} />}
              {currentStep === 4 && <MajorSelection onNext={goToNextStep} />}
              {currentStep === 5 && <Interests onNext={goToNextStep} />}
              {currentStep === 6 && <SkillSelection onNext={goToNextStep} />}
              {currentStep === 7 && <SuccessScreen onExplore={goToSignup} />}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
