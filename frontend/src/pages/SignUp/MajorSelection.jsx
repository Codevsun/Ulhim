import React, { useState } from "react";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import RadioButton from "../../components/RadioButton";

const MajorSelection = ({ onNext }) => {
  const [selectedMajor, setSelectedMajor] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setSelectedMajor(e.target.value);
    setError(false); // Remove error on selection
  };

  const handleNextClick = () => {
    if (!selectedMajor) {
      setError(true); //  Show error if no major selected
    } else {
      setError(false); //  Reset error if valid
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Logo in the Top-Left Corner */}
      <div className="absolute top-4 left-4">
        <Logo />
      </div>

      {/* Major Selection Container */}
      <div className="w-full max-w-md text-center p-6">
        <h2 className="text-xl font-bold mb-4 text-[24px]">What is your major?</h2>

        {/* Radio Buttons for Major Selection */}
        <div className="flex flex-col space-y-3 text-lg">
          {["Computer Science", "Computer Information System", "Cyber Security", "Artificial Intelligence"].map((major, index) => (
            <RadioButton
              key={index}
              label={major}
              value={major}
              checked={selectedMajor === major}
              onChange={handleChange}
              className={error ? "border-red-500" : ""} 
            />
          ))}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-xs mt-2 w-full text-left">Please select your major</p>}

        {/* Next Button */}
        <div className="mt-6 flex justify-center">
          <Button text="Next" onClick={handleNextClick} />
        </div>
      </div>
    </div>
  );
};

export default MajorSelection;
