import { useEffect, useState, useRef, useCallback } from "react";
import { fetchMovies } from "./utils/fetchMovies";
import { fetchActorData } from "./utils/fetchActorData";
import { fetchDirectorData } from "./utils/fetchDirectorData";
import MovieResult from "./Result";
import FormOptions from "./FormOptions";

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

  const randomPage = Math.floor(Math.random() * 500);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [buttonText, setButtonText] = useState("Suggest Film");
  const [rating, setRating] = useState("");
  const actorRef = useRef(null);
  const directorRef = useRef(null);
  const lastIndexRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const pickedGenre = movieDetails.selectedGenre;
      const pickedActorID = movieDetails.selectedActorID;
      const pickedDirectorID = movieDetails.selectedDirectorID;

      /* URL JUST TO GET A RANDOM MOVIE FROM TMDB */
      let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&primary_release_date.gte=1990`;

      // HAS A GENERE BEEN PICKED?
      if (pickedGenre && pickedGenre !== "any") {
        url += `&with_genres=${pickedGenre}`;
      }

      // HAS A RATING BEEN SELECTED?
      if (rating === 1) {
        url += `&vote_average.gte=0&vote_average.lte=2`;
      } else if (rating === 2) {
        url += `&vote_average.gte=3&vote_average.lte=4`;
      } else if (rating === 3) {
        url += `&vote_average.gte=5&vote_average.lte=6`;
      } else if (rating === 4) {
        url += `&vote_average.gte=7&vote_average.lte=9`;
      } else if (rating === 5) {
        url += `&vote_average.gte=9&vote_average.lte=10`;
      }

      // HAS ACTOR OR DIRECTOR BEEN PICKED?
      if (pickedActorID > 0 && pickedDirectorID > 0) {
        url += `&with_cast=${pickedActorID}&with_crew=${pickedDirectorID}`;
      } else if (pickedActorID > 0) {
        url += `&with_cast=${pickedActorID}`;
      } else if (pickedDirectorID > 0) {
        url += `&with_crew=${pickedDirectorID}`;
      } else {
        url += `&page=${randomPage}`;
      }

      console.log(url);
      const results = await fetchMovies(url, options);

      if (results.length > 0) {
        // GRAB A RANDOM RESULT
        let random = Math.floor(Math.random() * results.length);
        while (
          lastIndexRef.current !== null &&
          random === lastIndexRef.current
        ) {
          random = Math.floor(Math.random() * results.length);
        }
        const movie = results[random];

        // STORE THE RESULT IN STATE
        const ratingOutOfFive = movie.vote_average / 2;
        const dateParts = movie.release_date.split("-");
        const releaseDate =
          dateParts.length === 3
            ? dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0]
            : "Invalid Date Format";

        setMovieDetails((prevState) => ({
          ...prevState,
          movieName: movie.title,
          movieGenres: movie.genre_ids,
          movieRating: Math.round(ratingOutOfFive),
          moviePosterPath: movie.poster_path,
          movieReleaseDate: releaseDate,
          movieOverview: movie.overview,
        }));
        lastIndexRef.current = random;
        setShowResult(true);
      }
    };

    if (formSubmitted) {
      fetchData();
      setFormSubmitted(false);
      setButtonText("Suggest Another");
    }
  }, [formSubmitted, movieDetails, rating]);

  // SELECT A GENRE
  const handleGenreChange = (event) => {
    setMovieDetails((prevState) => ({
      ...prevState,
      selectedGenre: event.target.value,
    }));
  };

  // WHAT TO DO WHEN FORM SUBMITS
  const handleSubmit = async (event) => {
    event.preventDefault();

    // IF AN ACTOR IS SUBMITTED, SET DETAILS
    if (actorRef.current.value.trim() === "") {
      setMovieDetails((prevState) => ({
        ...prevState,
        selectedActor: null,
        selectedActorID: 0,
        selectedActorName: "",
      }));
    } else {
      const { id, name } = await fetchActorData(
        actorRef.current.value,
        options
      );
      setMovieDetails((prevState) => ({
        ...prevState,
        selectedActor: actorRef.current.value,
        selectedActorID: id,
        selectedActorName: name,
      }));
    }

    // IF A DIRECTOR IS SUBMITTED, SET DETAILS
    if (directorRef.current.value.trim() === "") {
      setMovieDetails((prevState) => ({
        ...prevState,
        selectedDirector: null,
      }));
    } else {
      const { id, name } = await fetchDirectorData(
        directorRef.current.value,
        options
      );

      setMovieDetails((prevState) => ({
        ...prevState,
        selectedDirector: directorRef.current.value,
        selectedDirectorID: id,
        selectedDirectorName: name,
      }));
    }

    setFormSubmitted(true);
  };

  useEffect(() => {
    console.log(movieDetails);
  }, [movieDetails.movieName]);

  return (
    <div className="container">
      <h1>Movie Picker</h1>
      <p>
        Use this to search for a random film to watch. Use the options to get
        more specific or just get a random one.
      </p>
      {showResult && (
        <div>
          <MovieResult movie={movieDetails} />
        </div>
      )}
      <form onSubmit={handleSubmit} id="picker">
        <FormOptions
          selectedGenre={movieDetails.selectedGenre}
          handleGenreChange={handleGenreChange}
          actorRef={actorRef}
          directorRef={directorRef}
          setRating={setRating}
        />
      </form>
      <button className="btn" type="submit" form="picker">
        {buttonText}
      </button>
    </div>
  );
}
