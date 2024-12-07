import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div className="absolute w-screen px-4 py-2 bg-gradient-to-b from-black z-30 flex justify-between">
      <div>
        <img
          className="w-44 "
          alt="netflix-logo"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        ></img>
      </div>
      <div className="flex">
        <img className="hidden md:block w-12 h-12" alt="usericon" />
        <button className="font-bold text-white" onClick={handleSignOut}>
          (Sign Out)
        </button>
      </div>
    </div>
  );
};

export default Header;
