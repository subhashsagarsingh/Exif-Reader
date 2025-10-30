import React from "react";

const Card = ({ icon, title, desc }) => {
  return (
    <div className="border p-6 rounded-2xl border-gray-300 transition text-center">
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="font-semibold text-lg text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  );
};

export default Card;
