import results from "./result.module.scss";
import getGenreNames from "../../hooks/genreNames";
import convertToHHMM from "../../hooks/convertToHHMM";
import { Ratings } from "../ratings/filmRatings";
import WatchTrailer from "../watchTrailer/watchTrailerButton";
import ExpandedResult from "./resultExpanded";
import { useState, useEffect } from "react";

const ResultCard = ({ movie }) => {
  const [expandedResult, setExpandedResult] = useState(false);

  const expandResult = () => {
    setExpandedResult(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can use 'auto' or 'smooth' for a smooth scroll
    });
  };

  useEffect(() => {
    // Add or remove the "no-scroll" class on the body based on the expandedResult state
    document.body.classList.toggle("no-scroll", expandedResult);

    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [expandedResult]);

  return (
    <div key={movie.id} className={results.card}>
      {movie.movieBackdrop ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.movieBackdrop}`}
          className={`${results.image} ${results.backdropImage}`}
          alt={movie.selectedMovie}
        />
      ) : movie.moviePosterPath ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.moviePosterPath}`}
          className={`${results.image} ${results.posterImage}`}
          alt={movie.selectedMovie}
        />
      ) : null}
      {movie.moviePosterPath ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.moviePosterPath}`}
          className={`${results.image} ${results.posterImage}`}
          alt={movie.selectedMovie}
        />
      ) : movie.movieBackdrop ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.movieBackdrop}`}
          className={`${results.image} ${results.backdropImage}`}
          alt={movie.selectedMovie}
        />
      ) : null}
      <h1 className={results.title}>{movie.movieName}</h1>
      <div className={results.metaGroup}>
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
          {movie.movieGenres !== null && movie.movieGenres !== undefined && (
            <li className={results.metaEntry}>
              <span className={results.metaKey}>
                {movie.movieGenres.length > 1 ? "Genres:" : "Genre:"}
              </span>
              <span className={results.metaValue}>
                {getGenreNames(movie.movieGenres)}
              </span>
            </li>
          )}
          <li className={results.metaEntry}>
            <span className={results.metaKey}>Runtime:</span>
            <span className={results.metaValue}>
              {convertToHHMM(movie.movieRunTime)}
            </span>
          </li>
        </ul>
      </div>

      {(movie.movieDirector || movie.movieCast) && (
        <div className={results.crewGroup}>
          <ul className={`${results.meta} ${results.metaCrew}`}>
            {movie.movieDirector && (
              <li className={results.metaEntry}>
                <span className={results.metaKey}>Director:</span>
                <span className={results.metaValue}>{movie.movieDirector}</span>
              </li>
            )}
            {movie.movieCast && (
              <li className={results.metaEntry}>
                <span className={results.metaKey}>Cast:</span>
                <span className={results.metaValue}>
                  {movie.movieCast
                    ? movie.movieCast.slice(0, 3).join(", ")
                    : ""}
                </span>
              </li>
            )}
          </ul>
        </div>
      )}

      {movie.movieOverview && (
        <div className={results.overview}>
          <span className={results.overviewHeading}>Overview:</span>
          <p className={results.overviewParagraph}>{movie.movieOverview}</p>
        </div>
      )}
      <div className={results.buttonGroup}>
        {movie.movieTrailer && <WatchTrailer link={movie} />}
        <button onClick={expandResult}>Expand</button>
      </div>
      {expandedResult ? (
        <ExpandedResult movie={movie} setExpandedResult={setExpandedResult} />
      ) : null}
    </div>
  );
};

export default ResultCard;
