import { fetchMovies } from "./fetchMovies";
export const fetchMovieData = async (
  movieDetails,
  setMovieDetails,
  options,
  rating,
  setShowResult,
  lastIndexRef
) => {
  const pickedGenre = movieDetails.selectedGenre;
  const pickedActorID = movieDetails.selectedActorID;
  const pickedDirectorID = movieDetails.selectedDirectorID;
  let updatedMovieData = null;
  let page = Math.floor(Math.random() * 500);

  /* URL JUST TO GET A RANDOM MOVIE FROM TMDB */
  let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&primary_release_date.gte=1990&page=${page}`;

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
    url += `&vote_average.gte=10`;
  }

  // HAS ACTOR OR DIRECTOR BEEN PICKED?
  if (pickedActorID > 0 && pickedDirectorID > 0) {
    url += `&with_cast=${pickedActorID}&with_crew=${pickedDirectorID}`;
  } else if (pickedActorID > 0) {
    url += `&with_cast=${pickedActorID}`;
  } else if (pickedDirectorID > 0) {
    url += `&with_crew=${pickedDirectorID}`;
  }

  const movieData = await fetchMovies(url, options);
  const totalPages = Math.min(movieData.total_pages, 500);
  const randomTotalPage = Math.floor(Math.random() * totalPages) + 1;
  const updatedUrl = url.replace(/&page=\d+/, `&page=${randomTotalPage}`);

  if (pickedGenre || rating || pickedActorID || pickedDirectorID) {
    updatedMovieData = await fetchMovies(updatedUrl, options);
  }

  const results = updatedMovieData
    ? updatedMovieData.results
    : movieData.results;

  if (results && results.length > 0) {
    // GRAB A RANDOM RESULT
    let random = Math.floor(Math.random() * results.length);
    while (lastIndexRef.current !== null && random === lastIndexRef.current) {
      random = Math.floor(Math.random() * results.length);
    }
    const movie = results[random];

    // STORE THE RESULT IN STATE
    const ratingOutOfFive = movie.vote_average / 2;
    const dateParts = movie.release_date.split("-");
    const releaseDate =
      dateParts.length === 3 ? dateParts[0] : "Invalid Date Format";

    setMovieDetails((prevState) => ({
      ...prevState,
      movieID: movie.id,
      movieName: movie.title,
      movieGenres: movie.genre_ids,
      movieRating: Math.round(ratingOutOfFive),
      moviePosterPath: movie.poster_path,
      movieBackdrop: movie.backdrop_path,
      movieReleaseDate: releaseDate,
      movieOverview: movie.overview,
    }));
    lastIndexRef.current = random;
    setShowResult(true);
  }
};
