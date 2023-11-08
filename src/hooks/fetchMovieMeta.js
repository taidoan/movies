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
        movieCast: castNames,
      }));
    }

    // Gets The Director
    if (movieMeta?.credits && movieMeta?.credits.crew) {
      const filteredCrew = movieMeta.credits.crew.filter(
        (item) => item.job === "Director"
      );

      if (filteredCrew.length > 0) {
        const directorName = filteredCrew[0].name;
        setMovieDetails((prevState) => ({
          ...prevState,
          movieDirector: directorName,
        }));
      } else {
        setMovieDetails((prevState) => ({
          ...prevState,
          movieDirector: null,
        }));
      }
    }

    // Get Run Time
    if (movieMeta?.runtime) {
      setMovieDetails((prevState) => ({
        ...prevState,
        movieRunTime: movieMeta.runtime || null,
      }));
    }

    // Get Age Rating
    if (
      movieMeta.release_dates &&
      movieMeta.release_dates.results &&
      movieMeta.release_dates.results.length > 0
    ) {
      let ageRating;
      const ageRatingGB = movieMeta.release_dates.results.find((item) =>
        item.iso_3166_1.includes("GB")
      );
      const ageRatingUS = movieMeta.release_dates.results.find((item) =>
        item.iso_3166_1.includes("US")
      );

      if (ageRatingGB) {
        ageRating = ageRatingGB.release_dates[0].certification;
      } else if (ageRatingUS) {
        ageRating = ageRatingUS.release_dates[0].certification;
      } else {
        const randomIndex = Math.floor(
          Math.random() * movieMeta.release_dates.results.length
        );
        const randomResult = movieMeta.release_dates.results[randomIndex];
        ageRating = randomResult.release_dates[0].certification;
      }

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

    if (earliestTrailer?.key) {
      setMovieDetails((prevState) => ({
        ...prevState,
        movieTrailer: `https://www.youtube.com/watch?v=` + earliestTrailer.key,
      }));
    } else {
      setMovieDetails((prevState) => ({
        ...prevState,
        movieTrailer: null,
      }));
    }

    // Get Watch Providers
    const providers = movieMeta["watch/providers"]?.results?.GB;

    if (providers?.link) {
      setMovieDetails((prevState) => ({
        ...prevState,
        movieWatchLink: providers.link,
      }));
    }

    if (providers?.buy) {
      setMovieDetails((prevState) => ({
        ...prevState,
        movieBuyProviders: providers.buy || null,
      }));
    } else {
      setMovieDetails((prevState) => ({
        ...prevState,
        movieBuyProviders: null,
      }));
    }

    if (providers?.flatrate) {
      setMovieDetails((prevState) => ({
        ...prevState,
        movieStreamingProviders: providers.flatrate,
      }));
    } else {
      setMovieDetails((prevState) => ({
        ...prevState,
        movieStreamingProviders: null,
      }));
    }

    if (providers?.rent) {
      setMovieDetails((prevState) => ({
        ...prevState,
        movieRentProviders: providers.rent || null,
      }));
    } else {
      setMovieDetails((prevState) => ({
        ...prevState,
        movieRentProviders: null,
      }));
    }
  }
};
