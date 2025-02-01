import React, { useState } from "react";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import RadioButton from "../../components/RadioButton"; 

const YearSelection = ({ onNext }) => {
  const [selectedYear, setSelectedYear] = useState("");
  const [error, setError] = useState(false); // Error State

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
    setError(false); // Reset error when user selects a year
  };

  const handleNextClick = () => {
    if (!selectedYear) {
      setError(true); // Show error if no year selected
    } else {
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>

      {/* Year Selection Container */}
      <div className="w-full max-w-md text-center p-6">
        <h2 className="text-xl font-bold mb-4 text-[24px]">What year are you?</h2>
        <div className="flex flex-col space-y-3 text-lg text-left w-full">
          {["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"].map((year, index) => (
            <RadioButton
              key={index}
              label={year}
              value={year}
              checked={selectedYear === year}
              onChange={handleChange}
            />
          ))}
        </div>

      
        {error && (
          <p className="text-red-500 text-xs mt-2 w-full text-left">
            Please select your year
          </p>
        )}


        <div className="mt-6 flex justify-center">
          <Button text="Next" onClick={handleNextClick} />
        </div>
      </div>
    </div>
  );
};

export default YearSelection;
