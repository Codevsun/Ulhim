import React from "react";
import ProgressBar from "../../components/Progressbar";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

const SuccessScreen = ({ onExplore }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>

    {/* Show Progress Bar 
      <div className="w-full py-4">
        <ProgressBar steps={["Verify Email", "Details", "Done"]} currentStep={step} />
      </div>*/}

 
      <div className="w-full max-w-md text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <h3 className="text-lg font-semibold mb-6">Welcome to Ulhim Platform!</h3>

        <p className="text-gray-400 text-sm mb-6">
          You are all set to explore, connect, and showcase your achievements!
        </p>

        <div className="mt-6 flex justify-center">
          <Button text="Start Exploring" onClick={onExplore} />
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
