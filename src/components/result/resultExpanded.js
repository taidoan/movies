import results from "./results-expanded.module.scss";
import getGenreNames from "../../hooks/genreNames";
import convertToHHMM from "../../hooks/convertToHHMM";
import { Ratings } from "../ratings/filmRatings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { ProvidersTab } from "../providers/filmProvidersTab";
import { SimilarMovies } from "../similarMovies/similarMovies";

const ExpandedResult = ({ movie }) => {
  const expandedResult = document.querySelector("dialog");

  return (
    <dialog className={results.outerContainer}>
      <FontAwesomeIcon
        icon={faCircleXmark}
        onClick={() => {
          expandedResult.close();
        }}
        className={results.closeWindow}
      />
      <div key={movie.id} className={results.container}>
        {movie.movieBackdrop && (
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.movieBackdrop}`}
            alt={`Backdrop image for the movie: ${movie.movieName}`}
            className={`${results.fullWidth} ${results.backdrop}`}
          />
        )}
        <article className={results.movieResult}>
          <h1 className={results.title}>{movie.movieName}</h1>
          <div className={results.metaGroup}>
            <Ratings rating={movie.movieRating} expandedResult={true} />
            <div className={`${results.meta} ${results.metaInfo}`}>
              <span>{movie.movieAgeRating}</span>
              <span>{movie.movieReleaseDate}</span>
              <span>{convertToHHMM(movie.movieRunTime, "compact")}</span>
            </div>
          </div>
          {movie.movieOverview && (
            <div
              className={`${results.meta} ${results.metaGroup} ${results.metaOverview}`}
            >
              <p>{movie.movieOverview}</p>
            </div>
          )}
          {(movie.movieDirector || movie.movieCast || movie.movieGenres) && (
            <div
              className={`${results.meta} ${results.metaGroup} ${results.metaCrew}`}
            >
              {movie.movieGenres && (
                <div className={results.meta}>
                  <span>
                    <span className={results.metaTitle}>
                      {movie.movieGenres.length > 1 ? "Genres:" : "Genre:"}
                    </span>
                    {getGenreNames(movie.movieGenres)}
                  </span>
                </div>
              )}

              {movie.movieDirector && (
                <div className={results.meta}>
                  <span>
                    <span className={results.metaTitle}>Director:</span>
                    {movie.movieDirector}
                  </span>
                </div>
              )}

              {movie.movieCast && (
                <div className={results.meta}>
                  <span>
                    <span className={results.metaTitle}>Cast:</span>
                    {movie.movieCast.join(", ")}
                  </span>
                </div>
              )}
            </div>
          )}
          {movie.movieTrailer && (
            <div className={`${results.metaGroup} ${results.metaTrailer}`}>
              <a
                href={movie.movieTrailer}
                target="_blank"
                rel="noopener noreferrer"
                className={results.trailerButton}
                title={`Watch The Trailer For ${movie.movieName} on YouTube.`}
              >
                Watch Trailer
              </a>
            </div>
          )}
          {(movie.movieStreamingProviders ||
            movie.movieBuyProviders ||
            movie.movieRentProviders) && (
            <div className={`${results.metaGroup} ${results.metaProviders}`}>
              <span className={results.metaTitle}>Where To Watch</span>
              <ProvidersTab provider={movie} />
            </div>
          )}
          {movie.similarMovies &&
            movie.similarMovies !== null &&
            movie.similarMovies.length > 0 && (
              <div className={`${results.metaGroup} ${results.metaSimilar}`}>
                <span className={results.metaTitle}>You May Also Like</span>
                <SimilarMovies similar={movie.similarMovies} />
              </div>
            )}
          {(movie.movieStreamingProviders ||
            movie.movieBuyProviders ||
            movie.movieRentProviders) && (
            <p className={results.credit}>
              Data provided by{" "}
              <a
                href="https://www.justwatch.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                JustWatch
              </a>
            </p>
          )}
        </article>
      </div>
    </dialog>
  );
};

export default ExpandedResult;
