import { useEffect, useState, useRef } from "react";
import { fetchMovieData } from "./hooks/fetchMovieData";
import { fetchMovieMeta } from "./hooks/fetchMovieMeta";
import ResultCard from "./components/result/resultCard";
import MoviePickerForm from "./components/form/form";
import home from "./styles/home.module.scss";
export default function App() {
  /* TMDB API STUFF */
  const apiKey = process.env.REACT_APP_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [rating, setRating] = useState("");
  const lastIndexRef = useRef(null);

  useEffect(() => {
    if (formSubmitted) {
      fetchMovieData(
        movieDetails,
        setMovieDetails,
        options,
        rating,
        setShowResult,
        lastIndexRef
      );
      setFormSubmitted(false);
    }
  }, [formSubmitted, movieDetails, rating]);

  useEffect(() => {
    fetchMovieMeta(movieDetails, setMovieDetails, options);
  }, [movieDetails.movieID]);

  return (
    <div className={`container ${home.container}`}>
      <h1 className={home.title}>Movie Shuffle</h1>
      <p className={home.intro}>
        Explore random films effortlessly! Customize your search or go
        completely random. Get quick details and find your next movie night
        pick.
      </p>
      {showResult && <ResultCard movie={movieDetails} />}
      <MoviePickerForm
        setMovieDetails={setMovieDetails}
        options={options}
        movieDetails={movieDetails}
        setFormSubmitted={setFormSubmitted}
        setRating={setRating}
      />
    </div>
  );
}
