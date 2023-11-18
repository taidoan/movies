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

  useEffect(() => {
    console.log(movieDetails);
  }, [movieDetails.movieRunTime]);

  return (
    <div className={`container ${home.container}`}>
      <h1 className={home.title}>Movie Picker</h1>
      <p className={home.intro}>
        Use this to search for a random film to watch. Use the options to get
        more specific or just get a random one.
      </p>
      {showResult && <ResultCard movie={movieDetails} />}
      <MoviePickerForm
        setMovieDetails={setMovieDetails}
        options={options}
        movieDetails={movieDetails}
        setFormSubmitted={setFormSubmitted}
        setRating={setRating}
      />
      {showResult && <p className="credits">Data provided by JustWatch</p>}
    </div>
  );
}
