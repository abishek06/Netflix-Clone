import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { User_URL } from "../utils/constant";
import { Image_URL } from "../utils/constant";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: email,
            imageUrl: User_URL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // similar to component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-4 py-2 bg-gradient-to-b from-black z-30 flex justify-between">
      <div>
        <img className="w-44 " alt="netflix-logo" src={Image_URL}></img>
      </div>
      {user && (
        <div className="flex">
          <img
            className="hidden md:block w-12 h-12"
            alt="usericon"
            src={User_URL}
          />
          <button className="font-bold text-white" onClick={handleSignOut}>
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
