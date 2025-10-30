import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/signin"); 
  }, [user, navigate]);

  const pages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-3 text-gray-800">
        Welcome, <span className="text-blue-500">{user?.name}!</span>
      </h2>

      {/* UX paragraph */}
      <p className="text-gray-600 mb-8 leading-relaxed border p-4 bg-blue-50 border-blue-500 rounded-xl">
        You’ve successfully signed in. This is your central dashboard where you can easily 
        navigate to different sections of the app. Whether you want to explore the homepage, 
        learn more about us, or get in touch — everything is just a click away. Enjoy a 
        smooth and simple experience!
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {pages.map((page) => (
          <Link key={page.name} to={page.path}>
            <div
              className="text-center py-5 rounded-xl border hover:shadow-lg hover:border-blue-400 transition cursor-pointer"
            >
              <h3 className="font-semibold text-gray-700">{page.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
