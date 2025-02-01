import React, { useState } from "react";
import Logo from "../../components/Logo";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ newPassword: "", confirmPassword: "" });

  const validatePassword = (password) => {
    return password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setErrors({
      ...errors,
      newPassword: validatePassword(value) ? "" : "Password must be at least 8 characters & contain a special character.",
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors({
      ...errors,
      confirmPassword: value === newPassword ? "" : "Passwords do not match.",
    });
  };

  const handleResetPassword = () => {
    if (!errors.newPassword && !errors.confirmPassword && newPassword && confirmPassword) {
      alert("Password Reset Successfully!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-black text-center">
        <div className="mb-6">
          <Logo />
        </div>

        <div className="w-full text-center">
          <p className="text-white font-trap font-bold text-3xl mb-3">Reset Password</p>
          <p className="text-gray-400 text-[14px] text-left leading-tight font-trap">
            Enter a new password below to change your password
          </p>

          <div className="relative w-full mt-4">
            <InputField
              placeholder="New Password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={handleNewPasswordChange}
              className={`pr-10 border-b-2 focus:outline-none ${
                errors.newPassword ? "border-red-500" : "border-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-10 bottom-1 transform -translate-y-1/2 text-gray-400"
            >
              {showNewPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          {errors.newPassword && <p className="text-gray-500 text-xs text-left mt-1">{errors.newPassword}</p>}

          {/* Confirm Password Input */}
          <div className="relative w-full mt-4">
            <InputField
              placeholder="Re-enter New Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`pr-10 border-b-2 focus:outline-none ${
                errors.confirmPassword ? "border-red-500" : "border-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-10 bottom-1 transform -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-gray-500 text-xs text-left mt-1">{errors.confirmPassword}</p>}

          <div className="mt-12">
            <Button text="Reset Password" onClick={handleResetPassword} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
