import results from "./results-expanded.module.scss";
import getGenreNames from "../../hooks/genreNames";
import convertToHHMM from "../../hooks/convertToHHMM";
import WatchTrailer from "../watchTrailer/watchTrailerButton";
import { Ratings } from "../ratings/filmRatings";
import {
  StreamingProviders,
  BuyMovieProviders,
  RentMovieProviders,
} from "../providers/filmProviders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { ProvidersTab } from "../providers/filmProvidersTab";
import { register } from "swiper/element/bundle";

const ExpandedResult = ({ movie, setExpandedResult }) => {
  register();
  const closeResult = () => {
    setExpandedResult(false);
  };
  return (
    <div className={results.outerContainer}>
      <FontAwesomeIcon
        icon={faCircleXmark}
        onClick={closeResult}
        className={results.closeWindow}
      />
      <div key={movie.id} className={results.container}>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.movieBackdrop}`}
          alt={`Backdrop image for the movie: ${movie.movieName}`}
          className={`${results.fullWidth} ${results.backdrop}`}
        />
        <article className={results.movieResult}>
          <h1 className={results.title}>{movie.movieName}</h1>
          <div className={results.metaGroup}>
            <Ratings rating={movie.movieRating} />
            <div className={`${results.meta} ${results.metaInfo}`}>
              <span>{movie.movieAgeRating}</span>
              <span>{movie.movieReleaseDate}</span>
              <span>{convertToHHMM(movie.movieRunTime, "compact")}</span>
            </div>
          </div>
          {movie.movieOverview && (
            <div className={`${results.meta} ${results.metaGroup}`}>
              <p>{movie.movieOverview}</p>
            </div>
          )}

          {(movie.movieDirector ||
            movie.movieCast ||
            movie.movieGenres !== null ||
            movie.movieGenres !== undefined) && (
            <div className={`${results.meta} ${results.metaGroup}`}>
              {movie.movieGenres !== null &&
                movie.movieGenres !== undefined && (
                  <div className={results.meta}>
                    <span>
                      <span className={results.metaTitle}>
                        {" "}
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
                    {" "}
                    <span className={results.metaTitle}>Cast:</span>
                    {movie.movieCast ? movie.movieCast.join(", ") : ""}
                  </span>
                </div>
              )}
            </div>
          )}
          {movie.movieTrailer && (
            <div className={results.metaGroup}>
              <a
                href={movie.movieTrailer}
                target="_blank"
                rel="noopener noreferrer"
                // className={button.watchTrailer}
                title={`Watch The Trailer For ${movie.movieName} on YouTube.`}
              >
                Watch Trailer
              </a>
            </div>
          )}
          {(movie.movieStreamingProviders ||
            movie.movieBuyProviders ||
            movie.movieRentProviders) && (
            <div className={results.metaGroup}>
              <ProvidersTab provider={movie} />
            </div>
          )}
          <div className={results.metaGroup}>
            <span className={results.metaTitle}>You May Also Like</span>
            <swiper-container slides-per-view="2">
              {movie.similarMovies.map((movie) => (
                <swiper-slide key={movie.id} class={results.similarCard}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                    className={results.similarCardImg}
                  />
                  {movie.title}
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ExpandedResult;
