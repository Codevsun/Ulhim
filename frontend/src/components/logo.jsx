import React from 'react';
import logo from '../assets/images/Ulhim-logo.png';  // Add this import

const Logo = () => {

  return (
    <div className="mb-2">
        <img src={logo} alt="Logo" className="w-16 h-auto" />
        </div>
  );
};

export default Logo;
