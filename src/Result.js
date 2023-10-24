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
        src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
        className={results.image}
        alt={movie.title}
      />
      <h1>{movie.title}</h1>
      <p>Genre: {getGenreNames(movie.genre_ids)}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Overview: {movie.overview}</p>
      <p>Rating: {movie.vote_average}/10</p>
    </div>
  );
};

export default MovieResult;
