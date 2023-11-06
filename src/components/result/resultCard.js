import results from "./result.module.scss";
import getGenreNames from "../../hooks/genreNames";
import convertToHHMM from "../../hooks/convertToHHMM";
import { Ratings } from "../ratings/filmRatings";
import { StreamingProviders } from "../providers/filmProviders";
import WatchTrailer from "../watchTrailer/watchTrailerButton";

const ResultCard = ({ movie }) => {
  return (
    <div key={movie.id} className={results.card}>
      {movie.movieBackdrop ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.movieBackdrop}`}
          className={results.image}
          alt={movie.selectedMovie}
        />
      ) : movie.moviePosterPath ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.moviePosterPath}`}
          className={results.image}
          alt={movie.selectedMovie}
        />
      ) : null}
      <h1 className={results.title}>{movie.movieName}</h1>
      <ul className={results.meta}>
        <li className={results.metaEntry}>
          <span className={results.metaKey}>Rating:</span>
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
      <ul className={`${results.meta} ${results.metaCrew}`}>
        <li className={results.metaEntry}>
          <span className={results.metaKey}>Director:</span>
          <span className={results.metaValue}>
            {movie.movieDirector && movie.movieDirector}
          </span>
        </li>
        <li className={results.metaEntry}>
          <span className={results.metaKey}>Cast:</span>
          <span className={results.metaValue}>
            {movie.movieCast ? movie.movieCast.join(", ") : ""}
          </span>
        </li>
      </ul>
      {movie.movieOverview && (
        <div className={results.overview}>
          <span className={results.overviewHeading}>Overview:</span>
          <p className={results.overviewParagraph}>{movie.movieOverview}</p>
        </div>
      )}
      {movie.movieStreamingProviders && (
        <div className={results.streamingProviders}>
          <StreamingProviders movie={movie} />
        </div>
      )}
      {movie.movieTrailer && <WatchTrailer link={movie} />}
    </div>
  );
};

export default ResultCard;
