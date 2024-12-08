import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { options } from "../utils/constant";
import { addTrailerVideo } from "../utils/moviesSlice";

const useTrailerVideo = (movieId) => {
  const dispatch = useDispatch();

  const getMovieTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "/videos",
      options
    );
    const json = await data.json();

    const movieVideo = json.results.filter((item) => item.type === "Trailer");

    const trailer = movieVideo.length ? movieVideo[0] : json.results[0];
    const trailerId = trailer.key;
    console.log("The Trailer id:", trailerId);
    if (trailerId) {
      dispatch(addTrailerVideo(trailerId));
    }
  };

  useEffect(() => {
    getMovieTrailer(movieId);
  }, []);
};

export default useTrailerVideo;
