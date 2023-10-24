import results from "./styles/components/result.module.scss";
const MovieResult = ({ movie }) => {
  return (
    <div key={movie.id} className={results.card}>
      <img
        src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
        className={results.image}
        alt={movie.title}
      />
      <h1>{movie.title}</h1>
      <p>Release Date: {movie.release_date}</p>
      <p>Overview: {movie.overview}</p>
      <p>Rating: {movie.vote_average}/10</p>
    </div>
  );
};

export default MovieResult;
