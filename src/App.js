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

  const constructURL = (
    pickedGenre,
    pickedActorID,
    pickedDirectorID,
    randomPage
  ) => {
    let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&primary_release_date.gte=1990`;

    if (pickedGenre && pickedGenre.length > 0) {
      url += `&with_genres=${pickedGenre}`;
    }

    if (pickedActorID > 0 && pickedDirectorID > 0) {
      url += `&with_cast=${pickedActorID}&with_crew=${pickedDirectorID}`;
    } else if (pickedActorID > 0) {
      url += `&with_cast=${pickedActorID}`;
    } else if (pickedDirectorID > 0) {
      url += `&with_crew=${pickedDirectorID}`;
    } else {
      url += `&page=${randomPage}`;
    }

    return url;
  };

  useEffect(() => {
    const fetchData = async () => {
      const pickedGenre = movieDetails.selectedGenre;
      const pickedActor = movieDetails.selectedActor;
      const pickedActorID = movieDetails.selectedActorID;
      const pickedDirector = movieDetails.selectedDirector;
      const pickedDirectorID = movieDetails.selectedDirectorID;

      let url = "";

      if (pickedGenre || pickedActorID || pickedDirectorID) {
        url = constructURL(
          pickedGenre,
          pickedActorID,
          pickedDirectorID,
          randomPage
        );
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?language=en-US&primary_release_date.gte=1990&page=${randomPage}`;
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

        // FETCH ACTOR DATA
        let actorID = 0;
        let actorName = "";

        if (pickedActor) {
          const { id, name } = await fetchActorData(pickedActor, options);
          actorID = id;
          actorName = name;
        }

        // FETCH DIRECTOR DATA
        let directorID = 0;
        let directorName = "";

        if (pickedDirector) {
          const { id, name } = await fetchDirectorData(pickedDirector, options);
          directorID = id;
          directorName = name;
        }

        // STORE THE RESULT IN STATE
        setMovieDetails((prevState) => ({
          ...prevState,
          movieName: movie.title,
          movieGenres: movie.genre_ids,
          movieRating: movie.vote_average,
          moviePosterPath: movie.poster_path,
          movieReleaseDate: movie.release_date,
          movieOverview: movie.overview,
          selectedActorID: actorID,
          selectedActorName: actorName,
          selectedDirectorID: directorID,
          selectedDirectorName: directorName,
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
  const handleSubmit = (event) => {
    event.preventDefault();

    if (actorRef.current.value.trim() === "") {
      setMovieDetails((prevState) => ({
        ...prevState,
        selectedActor: null,
      }));
    } else {
      setMovieDetails((prevState) => ({
        ...prevState,
        selectedActor: actorRef.current.value,
      }));
    }

    if (directorRef.current.value.trim() === "") {
      setMovieDetails((prevState) => ({
        ...prevState,
        selectedDirector: null,
      }));
    } else {
      setMovieDetails((prevState) => ({
        ...prevState,
        selectedDirector: directorRef.current.value,
      }));
    }

    setFormSubmitted(true);
  };

  useEffect(() => {
    console.log(movieDetails);
  }, [
    movieDetails.movieName,
    movieDetails.selectedActorID,
    movieDetails.selectedDirectorID,
  ]);

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
      <hr />
      <form onSubmit={handleSubmit}>
        <FormOptions
          selectedGenre={movieDetails.selectedGenre}
          handleGenreChange={handleGenreChange}
          actorRef={actorRef}
          directorRef={directorRef}
          // selectedActorName={movieDetails.selectedActor}
          // handleDirector={handleDirector}
        />
        <button type="submit">roll</button>
      </form>
      {showResult && <MovieResult movie={movieDetails} />}
    </div>
  );
}
