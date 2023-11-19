import results from "./result.module.scss";
import btns from "./../../styles/buttons.module.scss";
import getGenreNames from "../../hooks/genreNames";
import convertToHHMM from "../../hooks/convertToHHMM";
import { Ratings } from "../ratings/filmRatings";
import WatchTrailer from "../watchTrailer/watchTrailerButton";
import ExpandedResult from "./resultExpanded";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

const ResultCard = ({ movie }) => {
  const [expandedResult, setExpandedResult] = useState(false);

  const expandResult = () => {
    setExpandedResult(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    document.body.classList.toggle("no-scroll", expandedResult);
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [expandedResult]);

  return (
    <div key={movie.id} className={results.card}>
      <h1 className={results.title}>{movie.movieName}</h1>
      {movie.movieBackdrop && (
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.movieBackdrop}`}
          className={`${results.image} ${results.backdropImage}`}
          alt={movie.selectedMovie}
        />
      )}
      {movie.moviePosterPath && (
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.moviePosterPath}`}
          className={`${results.image} ${results.posterImage}`}
          alt={movie.selectedMovie}
        />
      )}
      <ul className={`${results.meta} ${results.metaDetails}`}>
        <li className={results.metaItem}>
          <span className={results.metaTitle}>Rating:</span>
          <Ratings rating={movie.movieRating} />
        </li>
        <li className={results.metaItem}>
          <span className={results.metaTitle}>Release Year:</span>
          <span className={results.metaValue}>{movie.movieReleaseDate}</span>
        </li>
        <li className={results.metaItem}>
          <span className={results.metaTitle}>Age Rating:</span>
          <span className={results.metaValue}>{movie.movieAgeRating}</span>
        </li>
        <li className={results.metaItem}>
          <span className={results.metaTitle}>Runtime:</span>
          <span className={results.metaValue}>
            {convertToHHMM(movie.movieRunTime)}
          </span>
        </li>
      </ul>
      <div className={results.group}>
        {movie.movieGenres !== null && movie.movieGenres !== undefined && (
          <div className={`${results.meta} ${results.metaGenres}`}>
            <span className={results.metaTitle}>
              {movie.movieGenres.length > 1 ? "Genres:" : "Genre:"}
            </span>
            <span className={results.metaValue}>
              {getGenreNames(movie.movieGenres)}
            </span>
          </div>
        )}
        {(movie.movieDirector || movie.movieCast) && (
          <ul className={`${results.meta} ${results.metaCrew}`}>
            {movie.movieDirector && (
              <li className={results.metaItem}>
                <span className={results.metaTitle}>Director:</span>
                <span className={results.metaValue}>{movie.movieDirector}</span>
              </li>
            )}
            {movie.movieCast && (
              <li className={results.metaItem}>
                <span className={results.metaTitle}>Cast:</span>
                <span className={results.metaValue}>
                  {movie.movieCast
                    ? movie.movieCast.slice(0, 3).join(", ")
                    : ""}
                </span>
              </li>
            )}
          </ul>
        )}
        {movie.movieOverview && (
          <div className={results.overview}>
            <span className={results.overviewTitle}>Overview:</span>
            <p className={results.overviewContent}>{movie.movieOverview}</p>
          </div>
        )}
        <div className={results.ctas}>
          {movie.movieTrailer && <WatchTrailer link={movie} />}
          <button
            onClick={expandResult}
            className={`${results.expandResults} ${btns.cardButton}`}
          >
            More Info
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </button>
        </div>
      </div>
      {expandedResult ? (
        <ExpandedResult movie={movie} setExpandedResult={setExpandedResult} />
      ) : null}
    </div>
  );
};

export default ResultCard;
