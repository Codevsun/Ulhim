import React, { useState } from "react";
import ProgressBar from "../../components/Progressbar";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

const SkillSelection = ({ onNext }) => {
  const skillsList = [
    { label: "Programming Languages", color: "bg-green-500 text-black", selectedColor: "bg-green-700 text-white" },
    { label: "Web Development", color: "bg-gray-500 text-white", selectedColor: "bg-gray-700 text-black" },
    { label: "Mobile Development", color: "bg-red-500 text-white", selectedColor: "bg-red-700 text-white" },
    { label: "Data Analysis", color: "bg-yellow-500 text-black", selectedColor: "bg-yellow-700 text-white" },
    { label: "DevOps and Automation", color: "bg-blue-500 text-white", selectedColor: "bg-blue-700 text-white" },
    { label: "Network Security", color: "bg-yellow-600 text-black", selectedColor: "bg-yellow-800 text-white" },
    { label: "Application Security", color: "bg-gray-400 text-white", selectedColor: "bg-gray-600 text-black" },
    { label: "Database Management", color: "bg-red-600 text-white", selectedColor: "bg-red-800 text-white" },
    { label: "UI / UX Design", color: "bg-pink-500 text-white", selectedColor: "bg-pink-700 text-white" },
    { label: "Machine Learning", color: "bg-green-400 text-black", selectedColor: "bg-green-600 text-white" },
    { label: "Cloud Computing", color: "bg-blue-400 text-white", selectedColor: "bg-blue-600 text-white" },
    { label: "Team Leadership", color: "bg-yellow-400 text-black", selectedColor: "bg-yellow-600 text-white" },
    { label: "Decision Making", color: "bg-gray-300 text-black", selectedColor: "bg-gray-500 text-white" },
    { label: "Project Management", color: "bg-orange-500 text-white", selectedColor: "bg-orange-700 text-white" },
    { label: "Presentation Skills", color: "bg-blue-300 text-black", selectedColor: "bg-blue-500 text-white" },
    { label: "Technical Writing", color: "bg-red-400 text-white", selectedColor: "bg-red-600 text-white" },
    { label: "Problem Solving", color: "bg-gray-200 text-black", selectedColor: "bg-gray-400 text-white" },
    { label: "Market Research", color: "bg-green-600 text-black", selectedColor: "bg-green-800 text-white" },
  ];

  const [selectedSkills, setSelectedSkills] = useState([]);

  const toggleSkill = (label) => {
    setSelectedSkills((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>

    {/* Show Progress Bar 
      <div className="w-full py-4">
        <ProgressBar steps={["Verify Email", "Details", "Done"]} currentStep={step} />
      </div>*/}

    
      <div className="w-full max-w-3xl text-center p-6">
        <h2 className="text-lg font-semibold mb-4">What skills define you?</h2>

        {/* Toggleable Skill Buttons */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 justify-center">
          {skillsList.map((skill, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                selectedSkills.includes(skill.label) ? skill.selectedColor : skill.color
              }`}
              onClick={() => toggleSkill(skill.label)}
            >
              {skill.label}
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

export default SkillSelection;
