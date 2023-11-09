import { fetchMovies } from "./fetchMovies";

export const fetchMovieMeta = async (
  movieDetails,
  setMovieDetails,
  options
) => {
  if (movieDetails.movieID) {
    const movieMeta = await fetchMovies(
      `https://api.themoviedb.org/3/movie/${movieDetails.movieID}?language=en-US&append_to_response=release_dates,videos,watch/providers,credits`,
      options
    );

    // Gets First 3 Cast Members
    if (movieMeta?.credits && movieMeta?.credits.cast) {
      const filteredCast = movieMeta.credits.cast
        .filter((item) => item.known_for_department === "Acting")
        .filter(
          (item, index, self) =>
            self.findIndex((i) => i.id === item.id) === index
        )
        .slice(0, 3); // Gets first 3 actors

      const castNames = filteredCast.map((item) => item.name);

      setMovieDetails((prevState) => ({
        ...prevState,
        movieCast: castNames.length > 0 ? castNames : null,
      }));
    }

    // Gets The Director
    if (movieMeta?.credits && movieMeta?.credits.crew) {
      const filteredCrew = movieMeta.credits.crew.filter(
        (item) => item.job === "Director"
      );

      const directorName = filteredCrew[0].name;

      setMovieDetails((prevState) => ({
        ...prevState,
        movieDirector: filteredCrew.length > 0 ? directorName : null,
      }));
    }

    // Get Run Time
    if (movieMeta?.runtime) {
      setMovieDetails((prevState) => ({
        ...prevState,
        movieRunTime: movieMeta.runtime || null,
      }));
    }

    // Get Age Rating
    if (movieMeta.release_dates?.results?.length > 0) {
      const ageRatingGB = movieMeta.release_dates.results.find((item) =>
        item.iso_3166_1.includes("GB")
      );
      const ageRatingUS = movieMeta.release_dates.results.find((item) =>
        item.iso_3166_1.includes("US")
      );

      const ageRating =
        ageRatingGB?.release_dates[0]?.certification ||
        ageRatingUS?.release_dates[0]?.certification ||
        (movieMeta.release_dates.results.length > 0
          ? movieMeta.release_dates.results[0].release_dates[0].certification
          : "N/A");

      setMovieDetails((prevState) => ({
        ...prevState,
        movieAgeRating: ageRating || "N/A",
      }));
    }

    // Get Trailer Details
    const trailers = movieMeta.videos.results.filter((item) =>
      item.name.includes("Trailer")
    );

    const publishedDates = trailers.map((trailer) => ({
      ...trailer,
      published_at: new Date(trailer.published_at),
    }));

    const earliestTrailer =
      publishedDates.length > 0
        ? publishedDates.reduce((earliest, current) =>
            current.published_at < earliest.published_at ? current : earliest
          )
        : null;

    setMovieDetails((prevState) => ({
      ...prevState,
      movieTrailer: earliestTrailer?.key
        ? `https://www.youtube.com/watch?v=${earliestTrailer.key}`
        : null,
    }));

    // Get Watch Providers
    const providers = movieMeta["watch/providers"]?.results?.GB;

    setMovieDetails((prevState) => ({
      ...prevState,
      movieWatchLink: providers?.link,
      movieBuyProviders: providers?.buy || null,
      movieStreamingProviders: providers?.flatrate || null,
      movieRentProviders: providers?.rent || null,
    }));
  }
};
