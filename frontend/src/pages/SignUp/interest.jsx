import React, { useState } from "react";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

const Interests = ({ onNext }) => {
  const interestsList = [
    { label: "Creative Arts", color: "bg-success text-black", selectedColor: "bg-green-700 text-white" },
    { label: "Intellectual and Academic Pursuits", color: "bg-default text-white", selectedColor: "bg-gray-600 text-black" },
    { label: "Lifestyle and Wellness", color: "bg-danger text-white", selectedColor: "bg-red-700 text-white" },
    { label: "Health and Biohacking", color: "bg-success text-white", selectedColor: "bg-green-700 text-white" },
    { label: "Technology and Innovation", color: "bg-warning text-black", selectedColor: "bg-yellow-700 text-white" },
    { label: "Personal Development", color: "bg-primary text-white", selectedColor: "bg-blue-700 text-white" },
    { label: "Pop Culture and Entertainment", color: "bg-danger text-white", selectedColor: "bg-red-700 text-white" },
    { label: "Social and Community Engagement", color: "bg-primary text-white", selectedColor: "bg-blue-700 text-white" },
    { label: "Fashion", color: "bg-warning text-black", selectedColor: "bg-yellow-700 text-white" },
  ];

  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (label) => {
    setSelectedInterests((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      {/* Logo in the Top-Left Corner */}
      <div className="absolute top-4 left-4">
        <Logo />
      </div>

   {/* Show Progress Bar 
      <div className="w-full py-4">
        <ProgressBar steps={["Verify Email", "Details", "Done"]} currentStep={step} />
      </div>*/}

      {/* Interests Selection */}
      <div className="w-full max-w-3xl text-center p-6">
        <h2 className="text-lg font-semibold mb-4">What are you passionate about?</h2>

        {/* Toggleable Interest Buttons */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-2 justify-center">
          {interestsList.map((interest, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                selectedInterests.includes(interest.label) ? interest.selectedColor : interest.color
              }`}
              onClick={() => toggleInterest(interest.label)}
            >
              {interest.label}
            </button>
          ))}
        </div>

        {/* Skip Button */}
        <div className="mt-4 flex justify-center">
          <Button text="Skip" onClick={onNext} />
        </div>
      </div>
    </div>
  );
};

export default Interests;
