import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateDetails } from "../utils/validate.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { updateProfile } from "firebase/auth";

const Login = () => {
  const [isSignIn, setSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    var message = validateDetails(email.current.value, password.current.value);
    setErrorMessage(message);
    if (errorMessage) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          alt="netflix bg"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/158a0e2a-cca4-40f5-86b8-11ea2a281b06/web_auto_scroll/IN-en-20241202-TRIFECTA-17d4ac11-8165-42fb-abc6-377cd44b509c_large.jpg"
        />
        <img
          alt="netflix bg"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/158a0e2a-cca4-40f5-86b8-11ea2a281b06/web_auto_scroll/IN-en-20241202-TRIFECTA-17d4ac11-8165-42fb-abc6-377cd44b509c_large.jpg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute bg-black bg-opacity-80 my-36 mx-auto right-0 left-0 text-white rounded-lg"
      >
        <h1 className="font-bold text-3xl p-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            className="p-2 mx-8 my-4 w-80 text-black"
            type="text"
            ref={name}
            placeholder="Enter Name"
          ></input>
        )}
        <input
          className="p-2 mx-8 my-4 w-80 text-black"
          type="text"
          ref={email}
          placeholder="Enter Email"
        ></input>
        <input
          className="p-2 mx-8 my-4 w-80 text-black"
          type="password"
          ref={password}
          placeholder="Enter Password"
        ></input>
        <button
          onClick={handleButtonClick}
          className="p-2 mx-8 my-4 w-80 bg-red-500 rounded-lg"
        >
          Submit
        </button>
        <p className="p-2 mx-8 my-2 font-bold text-2xl text-red-500">
          {errorMessage}
        </p>
        <p className="p-2 mx-8 cursor-pointer" onClick={toggleSignInForm}>
          {isSignIn
            ? " New to Netflix? Sign Up!!!"
            : "Already Registered User. Sign In!!"}
        </p>
      </form>
    </div>
  );
};

export default Login;
