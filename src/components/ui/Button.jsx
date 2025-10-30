import React from "react";

const Button = ({ children, onClick, disabled, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-4 rounded-xl font-semibold transition disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
