import results from "./styles/components/result.module.scss";
const genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const MovieResult = ({ movie }) => {
  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => genres[id]).join(", ");
  };
  return (
    <div key={movie.id} className={results.card}>
      <img
        src={"https://image.tmdb.org/t/p/original/" + movie.moviePosterPath}
        className={results.image}
        alt={movie.selectedMovie}
      />
      <h1>{movie.movieName}</h1>
      <p>Genre: {movie.movieGenres && getGenreNames(movie.movieGenres)}</p>
      <p>Release Date: {movie.movieReleaseDate}</p>
      <p>Overview: {movie.movieOverview}</p>
      <p>Rating: {movie.movieRating}/5</p>
    </div>
  );
};

export default MovieResult;
