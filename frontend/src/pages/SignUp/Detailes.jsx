import React, { useState } from "react";
import Logo from "../../components/Logo";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

const Details = ({ onNext }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    username: false,
    password: false,
  });

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 10); // Remove non-numeric & limit to 10
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    return match ? `${match[1]} ${match[2]} ${match[3]}` : cleaned;
  };

  const validateInput = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        return /^[A-Za-z]+$/.test(value); // Only letters
      case "phone":
        return /^[0-9]{10}$/.test(value.replace(/\D/g, "")); // Must be 10 digits
      case "username":
        return !/[.,_\-@$#%^*()!]/.test(value); // No special characters
      case "password":
        return value.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(value); // FIXED
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData({ ...formData, [name]: formatPhoneNumber(value) });
      setErrors({ ...errors, [name]: value.replace(/\D/g, "").length !== 10 });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: !validateInput(name, value) });
    }
  };

  const handleNextClick = () => {
    const newErrors = {
      firstName: !validateInput("firstName", formData.firstName),
      lastName: !validateInput("lastName", formData.lastName),
      phone: !validateInput("phone", formData.phone),
      username: !validateInput("username", formData.username),
      password: !validateInput("password", formData.password),
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      onNext();
    }
  };

  return (
    <>
     

      <div className="absolute top-4 left-4">
        <Logo />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <div className="w-full max-w-md p-6">
          <div className="relative w-full">
            <InputField
              label={<span className="text-blue-500 text-[15px]">First Name</span>}
              type="text"
              name="firstName"
              placeholder={"e.g. maab"}
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full bg-transparent p-2 border-b-2 focus:outline-none ${
                errors.firstName ? "border-red-500" : "border-blue-500"
              }`}
            />
            {errors.firstName && <p className="text-gray-500 text-xs mt-1">Enter a valid name (letters only)</p>}
          </div>

          <div className="relative w-full mt-4">
            <InputField
              label={<span className="text-blue-500 text-[15px]">Last Name</span>}
              type="text"
              name="lastName"
              placeholder={"e.g. almohsin"}
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full p-2 border-b-2 focus:outline-none ${
                errors.lastName ? "border-red-500" : "border-blue-500"
              }`}
            />
            {errors.lastName && <p className="text-gray-500 text-xs mt-1">Enter a valid name (letters only)</p>}
          </div>

          <div className="relative w-full mt-4">
            <InputField
              label={<span className="text-blue-500 text-[15px]">Phone</span>}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="XXX XXX XXXX"
              className={`w-full p-2 border-b-2 focus:outline-none ${
                errors.phone ? "border-red-500" : "border-blue-500"
              }`}
              maxLength={12}
            />
            {errors.phone && (
              <p className="text-gray-500 text-xs mt-1">Phone must be 10 digits and contain only numbers</p>
            )}
          </div>

          <div className="relative w-full mt-4">
            <InputField
              label={<span className="text-blue-500 text-[15px]">Username</span>}
              type="text"
              name="username"
              placeholder={"e.g. MaabIsHere"}
              value={formData.username}
              onChange={handleChange}
              className={`w-full p-2 border-b-2 focus:outline-none ${
                errors.username ? "border-red-500" : "border-blue-500"
              }`}
            />
            {errors.username && (
              <p className="text-gray-500 text-xs mt-1">No special characters like ., _ , - , & , $ , etc.</p>
            )}
          </div>

          <div className="relative w-full mt-4">
            <InputField
              label={<span className="text-blue-500 text-[15px]">Password</span>}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className={`w-full p-2 border-b-2 focus:outline-none ${
                errors.password ? "border-red-500" : "border-blue-500"
              }`}
            />
            {errors.password && <p className="text-gray-500 text-xs mt-1">Password must contain at least one special character and should be not less than 8 characters</p>}
          </div>

          <div className="mt-6 flex justify-center">
            <Button text="Next" onClick={handleNextClick} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
