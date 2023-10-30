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

  const useToggleOptions = () => {
    return useCallback(() => {
      const formOptions = document.getElementById("formOptions");
      formOptions.style.display =
        formOptions.style.display === "none" || formOptions.style.display === ""
          ? "grid"
          : "none";
    }, []);
  };

  const toggleOptions = useToggleOptions();
  const actorRef = useRef(null);
  const directorRef = useRef(null);
  const lastIndexRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const pickedGenre = movieDetails.selectedGenre;
      const pickedActorID = movieDetails.selectedActorID;
      const pickedDirectorID = movieDetails.selectedDirectorID;
      const [rating, setRating] = useState(0);

      /* URL JUST TO GET A RANDOM MOVIE FROM TMDB */
      let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&primary_release_date.gte=1990`;

      // HAS A GENERE BEEN PICKED?
      if (pickedGenre && pickedGenre !== "any") {
        url += `&with_genres=${pickedGenre}`;
      }

      // HAS A RATING BEEN SELECTED?

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
        setMovieDetails((prevState) => ({
          ...prevState,
          movieName: movie.title,
          movieGenres: movie.genre_ids,
          movieRating: movie.vote_average,
          moviePosterPath: movie.poster_path,
          movieReleaseDate: movie.release_date,
          movieOverview: movie.overview,
        }));
        lastIndexRef.current = random;
        setShowResult(true);
      }
    };

    if (formSubmitted) {
      fetchData();
      setFormSubmitted(false);
    }
  }, [formSubmitted, movieDetails]);

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
      <button className="btn btn-options" onClick={toggleOptions}>
        Options
      </button>
      <form onSubmit={handleSubmit}>
        <FormOptions
          selectedGenre={movieDetails.selectedGenre}
          handleGenreChange={handleGenreChange}
          actorRef={actorRef}
          directorRef={directorRef}
        />
        <button className="btn" type="submit">
          roll
        </button>
      </form>
      {showResult && (
        <div>
          <hr />
          <MovieResult movie={movieDetails} />
        </div>
      )}
    </div>
  );
}
