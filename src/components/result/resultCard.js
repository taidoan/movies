import results from "./result.module.scss";
import getGenreNames from "../../hooks/genreNames";
import convertToHHMM from "../../hooks/convertToHHMM";
import { Ratings } from "../ratings/filmRatings";
import { StreamingProviders } from "../providers/filmProviders";
import WatchTrailer from "../watchTrailer/watchTrailerButton";

const ResultCard = ({ movie }) => {
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
        <li className={results.metaEntry}>
          <span className={results.metaKey}>Movie Rating:</span>
          <Ratings rating={movie.movieRating} />
        </li>
        <li className={results.metaEntry}>
          <span className={results.metaKey}>Age Rating:</span>
          <span className={results.metaValue}>{movie.movieAgeRating}</span>
        </li>
        <li className={results.metaEntry}>
          <span className={results.metaKey}>Year Released:</span>
          <span className={results.metaValue}>{movie.movieReleaseDate}</span>
        </li>
        <li className={results.metaEntry}>
          <span className={results.metaKey}>
            {movie.movieGenres.length > 1 ? "Genres:" : "Genre:"}
          </span>
          <span className={results.metaValue}>
            {getGenreNames(movie.movieGenres)}
          </span>
        </li>
        <li className={results.metaEntry}>
          <span className={results.metaKey}>Runtime:</span>
          <span className={results.metaValue}>
            {convertToHHMM(movie.movieRunTime)}
          </span>
        </li>
      </ul>
      {movie.movieOverview && (
        <div className={results.overview}>
          <span className={results.overviewTitle}>Overview:</span>
          <p className={results.overviewParagraph}>{movie.movieOverview}</p>
        </div>
      )}
      {movie.movieStreamingProviders && <StreamingProviders movie={movie} />}
      {movie.movieTrailer && <WatchTrailer link={movie} />}
    </div>
  );
};

export default ResultCard;
