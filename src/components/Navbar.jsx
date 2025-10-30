import React, { useState, useContext } from "react";
import { Menu, X, Camera, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b fixed w-full z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-xl font-bold text-gray-800 hover:text-blue-600 transition"
          >
            <Camera className="w-7 h-7 text-blue-600" />
            <span className="ml-1">Meta</span>
            <span className="text-blue-600">Lens!</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-500 hover:text-blue-600 transition font-medium"
              >
                {link.name}
              </Link>
            ))}

            {/* Divider */}
            <span className="w-px h-5 bg-gray-300 mx-2"></span>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {!user ? (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-600 hover:text-blue-600 font-medium transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 font-medium transition"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-800 font-medium transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <div className="px-6 py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-gray-200 my-2" />

            {!user ? (
              <>
                <Link
                  to="/signin"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-blue-600 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center space-x-1 w-full py-2 text-red-600 hover:text-red-800 font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
