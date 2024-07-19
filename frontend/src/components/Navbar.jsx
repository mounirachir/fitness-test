import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Logout function
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setToken(null);
    console.log("Logged out successfully.");
    navigate("/login");
  };

  return (
    <nav className="italic font-bold flex flex-col md:flex-row justify-between px-3 bg-gradient-to-tl from-orange-500 via-black to-black border-4 border-gray-300">
      <img src={Logo} alt="Logo" className="w-56 lg:w-96" />
      <ul className="flex  items-center">
        {token ? (
          <li
            className="absolute top-4 left-64 md:top-3 lg:top-8 md:left-3/4 whitespace-nowrap bg-orange-700 hover:bg-orange-800 transition duration-200 text-white font-bold py-1 px-2 md:py-2 px-4 rounded border-2 border-gray-300 mr-16 cursor-pointer"
            onClick={handleLogoutClick}
          >
            LOGOUT
          </li>
        ) : (
          <>
            {location.pathname !== "/login" && (
              <li className="absolute top-3 left-64 md:top-3 lg:top-8 lg:left-2/4 whitespace-nowrap bg-orange-700 hover:bg-orange-800 transition duration-200 text-white font-bold py-2 px-4 rounded border-2 border-gray-300 mr-8 cursor-pointer">
                <Link to="/login">LOG IN</Link>
              </li>
            )}
            <li className="ml-4 p-5 text-white hover:text-orange-500 transition duration-200">
              <Link to="/">HOME</Link>
            </li>
            <li className="p-5 text-white hover:text-orange-500 transition duration-200">
              <Link to="/about">ABOUT</Link>
            </li>
            <li className="p-5 mr-20 text-white hover:text-orange-500 transition duration-200">
              <Link to="/contact">CONTACT</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
