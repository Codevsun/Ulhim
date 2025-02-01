import React from "react";

const ProgressBar = ({ steps, currentStep }) => (
  <div className="flex items-center w-full max-w-4xl mx-auto relative">
    {steps.map((step, index) => (
      <div key={index} className="flex flex-col items-center relative flex-1">
        {/* Connecting Line (ONLY IF NOT LAST STEP) */}
        {index < steps.length - 1 && (
          <div
            className={`absolute top-4 left-1/2 w-full h-1 transform -translate-y-1/2 ${
              index < currentStep ? "bg-blue-500" : "bg-gray-200"
            }`}
          />
        )}
        {/* Step Circle */}
        <div
          className={`w-8 h-8 flex items-center justify-center border-2 rounded-full z-10 ${
            index < currentStep
              ? "bg-blue-500 text-white border-blue-500"
              : index === currentStep
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-blue-500 border-blue-500"
          }`}
        >
          {index < currentStep ? <span className="text-white">✓</span> : <span>{index + 1}</span>}
        </div>
        {/* Step Label */}
        <span className="text-white text-sm mt-2">{step}</span>
      </div>
    ))}
  </div>
);

export default ProgressBar;
