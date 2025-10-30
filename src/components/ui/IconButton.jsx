import React from "react";

const IconButton = ({ children, icon, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 border py-2 px-5 rounded-lg font-medium transition ${className}`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  );
};

export default IconButton;
