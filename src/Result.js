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

const Ratings = ({ rating }) => {
  const max_rating = 5;
  const stars = Array.from({ length: max_rating }, (_, index) => (
    <span
      key={index}
      className={`${results.star} ${
        index < rating ? `${results.star_filled}` : ""
      }`}
    >
      ★
    </span>
  ));
  return (
    <div className={`${results.meta_value} ${results.meta_rating}`}>
      {stars}
    </div>
  );
};

const MovieResult = ({ movie }) => {
  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => genres[id]).join(", ");
  };
  return (
    <div key={movie.id} className={results.card}>
      {movie.moviePosterPath ? (
        <img
          src={"https://image.tmdb.org/t/p/original/" + movie.moviePosterPath}
          className={results.image}
          alt={movie.selectedMovie}
        />
      ) : null}

      <h1 className={results.title}>{movie.movieName}</h1>
      <ul className={results.meta}>
        <li className={results.meta_entry}>
          <span className={results.meta_key}>Release Date:</span>
          <span className={results.meta_value}>{movie.movieReleaseDate}</span>
          <Ratings rating={movie.movieRating} />
        </li>
        {movie.movieGenres && movie.movieGenres.length > 0 ? (
          <li
            className={
              movie.movieGenres.length > 2
                ? results.meta_entry
                : `${results.meta_entry} ${results.meta_entry_single}`
            }
          >
            <span className={results.meta_key}>
              {movie.movieGenres.length > 1 ? "Genres:" : "Genre:"}
            </span>
            <span className={results.meta_value}>
              {getGenreNames(movie.movieGenres)}
            </span>
          </li>
        ) : null}
        {movie.movieOverview.length > 1 ? (
          <li className={results.meta_entry}>
            <span className={results.meta_key}>Overview:</span>
            <span className={results.meta_value}>{movie.movieOverview}</span>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default MovieResult;
