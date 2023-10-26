import { useEffect, useState } from "react";
import { fetchMovies } from "./utils/fetchMovies";
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
    const fetchMoviesData = async () => {
      let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&primary_release_date.gte=1990&page=${randomPage}`;

      if (movieDetails.selectedGenre.length > 0) {
        url += `&with_genres=${movieDetails.selectedGenre}`;
      }

      const results = await fetchMovies(url, options);

      if (results.length > 0) {
        const random = Math.floor(Math.random() * results.length);
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
      }
    };

    if (formSubmitted) {
      fetchMoviesData();
      setFormSubmitted(false);
    }
  }, [formSubmitted, movieDetails, randomPage, options]);

  const handleGenreChange = (event) => {
    setMovieDetails({ ...movieDetails, selectedGenre: event.target.value });
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
          // SelectedActorName={movieDetails(selectedActor)}
          // handleActor={handleActor}
        />
        <button type="submit">Click me</button>
      </form>
      {movieDetails && <MovieResult movie={movieDetails} />}
    </div>
  );
}

export default App;
