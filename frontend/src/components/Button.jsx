// src/components/Button.jsx
import React from "react";

const Button = ({ text, onClick }) => {
  return (
    
    <button
    
      onClick={onClick}
      className=" w-80 py-1 bg-transparent border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300"
    >

      {text || "Next"}
    </button>
  );
};

export default Button;
