import React from "react";

const RadioButton = ({ label, value, name, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="appearance-none w-5 h-5 border-2 border-white rounded-full checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-white"
      />
      <span className="text-white text-lg">{label}</span>
    </label>
  );
};

export default RadioButton;
