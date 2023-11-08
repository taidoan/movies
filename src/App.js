import { useEffect, useState, useRef } from "react";
import { fetchMovieData } from "./hooks/fetchMovieData";
import { fetchMovieMeta } from "./hooks/fetchMovieMeta";
import ResultCard from "./components/result/resultCard";
import MoviePickerForm from "./components/form/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faPlay } from "@fortawesome/free-solid-svg-icons";
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
  const [buttonText, setButtonText] = useState(`Suggest Film`);
  const [buttonIcon, setButtonIcon] = useState(faPlay);
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
      setButtonText("Suggest Another");
      setButtonIcon(faRotate);
    }
  }, [formSubmitted, movieDetails, rating]);

  useEffect(() => {
    fetchMovieMeta(movieDetails, setMovieDetails, options);
  }, [movieDetails.movieID]);

  useEffect(() => {
    console.log(movieDetails);
  }, [movieDetails.movieRunTime]);

  return (
    <div className="container">
      <h1>Movie Picker</h1>
      <p>
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
      <button className="btn" type="submit" form="moviePicker">
        {buttonText} <FontAwesomeIcon icon={buttonIcon} />
      </button>
      {showResult && <p className="credits">Data provided by JustWatch</p>}
    </div>
  );
}
