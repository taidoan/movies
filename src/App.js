import { useEffect, useState } from "react";
import { fetchMovies } from "./utils/fetchMovies";
import { fetchActorID } from "./utils/fetchActorID";
import MovieResult from "./Result";
import FormOptions from "./FormOptions";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const randomPage = Math.floor(Math.random() * 500);
  const [movieDetails, setMovieDetails] = useState({
    selectedMovie: "",
    selectedGenre: "",
    selectedActor: "",
    selectedActorID: "",
    selectedDirector: "",
    selectedDirectorID: "",
    movieOverview: "",
    movieGenres: [],
    movieRating: "",
    moviePosterPath: "",
    movieReleaseDate: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const getActorID = async () => {
      if (movieDetails.selectedActor) {
        try {
          const actorID = await fetchActorID(
            movieDetails.selectedActor,
            options
          );
          setMovieDetails((prevState) => ({
            ...prevState,
            selectedActorID: actorID,
          }));
        } catch (error) {
          console.error("Error fetching actor ID:", error);
        }
      }
    };
    getActorID();
  }, [movieDetails.selectedActor, options]);

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&primary_release_date.gte=1990`;

      if (movieDetails.selectedGenre.length > 0) {
        url += `&with_genres=${movieDetails.selectedGenre}`;
      }

      if (movieDetails.selectedActorID) {
        url += `&with_cast=${movieDetails.selectedActorID}`;
      } else {
        url += `&page=${randomPage}`;
      }

      const results = await fetchMovies(url, options);
      let lastIndex = -1;

      if (results.length > 0) {
        let random = Math.floor(Math.random() * results.length);
        while (random === lastIndex) {
          random = Math.floor(Math.random() * results.length);
        }

        const movie = results[random];
        const updatedMovieDetails = {
          ...movieDetails,
          selectedMovie: movie.title,
          movieGenres: movie.genre_ids,
          movieRating: movie.vote_average,
          moviePosterPath: movie.poster_path,
          movieReleaseDate: movie.release_date,
          movieOverview: movie.overview,
        };
        setMovieDetails(updatedMovieDetails);
        console.log(updatedMovieDetails);
        lastIndex = random;
      }
    };

    if (formSubmitted) {
      fetchData();
      setFormSubmitted(false);
    }
  }, [
    formSubmitted,
    movieDetails,
    movieDetails.selectedActorID,
    movieDetails.selectedGenre,
    randomPage,
    options,
  ]);

  const handleGenreChange = (event) => {
    setMovieDetails({ ...movieDetails, selectedGenre: event.target.value });
  };

  const handleActor = (event) => {
    const value = event.target.value;

    if (value === "") {
      setMovieDetails({
        ...movieDetails,
        selectedActor: "",
        selectedActorID: "",
      });
    } else {
      setMovieDetails({ ...movieDetails, selectedActor: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const toggleOptions = () => {
    const formOptions = document.getElementById("formOptions");
    if (
      formOptions.style.display === "none" ||
      formOptions.style.display === ""
    ) {
      formOptions.style.display = "grid";
    } else {
      formOptions.style.display = "none";
    }
  };

  return (
    <div className="container">
      <h1>Movie Picker</h1>
      <p>
        Use this to search for a random film to watch. Use the options to get
        more specific or just get a random one.
      </p>
      <hr />
      <button className="btn btn-options" onClick={toggleOptions}>
        Options
      </button>
      <form onSubmit={handleSubmit}>
        <FormOptions
          selectedGenre={movieDetails.selectedGenre}
          handleGenreChange={handleGenreChange}
          selectedActorName={movieDetails.selectedActor}
          handleActor={handleActor}
        />
        <button type="submit">Click me</button>
      </form>
      {movieDetails && <MovieResult movie={movieDetails} />}
    </div>
  );
}

export default App;
