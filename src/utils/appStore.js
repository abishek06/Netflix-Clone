import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice.js";
import moviesReducer from "../utils/moviesSlice.js";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
  },
});

export default appStore;
