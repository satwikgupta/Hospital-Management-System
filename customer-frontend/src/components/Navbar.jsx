import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className="bg-gray-300 w-full text-black">
        <div className="container flex items-center justify-between px-6 py-4 mx-auto">
          <div className="flex items-center">
            <img src="/logo.png" alt="logo" className="h-10" />
          </div>

          <div className={`${show ? "" : "hidden"} md:flex md:items-center`}>
            <div className="flex flex-col md:flex-row md:mx-6">
              <Link
                className="my-1 text-sm hover:text-white md:mx-4 md:my-0"
                to="/"
                onClick={() => setShow(!show)}
              >
                Home
              </Link>

              <Link
                className="my-1 text-sm hover:text-white md:mx-4 md:my-0"
                to="/appointment"
                onClick={() => setShow(!show)}
              >
                Appointment
              </Link>

              <Link
                className="my-1 text-sm hover:text-white md:mx-4 md:my-0"
                to="/about"
                onClick={() => setShow(!show)}
              >
                About Us
              </Link>
            </div>

            {isAuthenticated ? (
              <button
                className="px-4 py-2 my-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            ) : (
              <button
                className="px-4 py-2 my-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={goToLogin}
              >
                LOGIN
              </button>
            )}
          </div>

          <div className="flex md:hidden" onClick={() => setShow(!show)}>
            <GiHamburgerMenu className= "hover:text-white" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
