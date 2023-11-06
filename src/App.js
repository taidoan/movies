import { useEffect, useState, useRef } from "react";
import { fetchMovies } from "./hooks/fetchMovies";
import { fetchMovieDetails } from "./hooks/fetchMovieDetails";
import ResultCard from "./components/result/resultCard";
import MoviePickerForm from "./components/form/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faPlay } from "@fortawesome/free-solid-svg-icons";
export default function App() {
  /* TMDB API STUFF */
  const apiKey = process.env.REACT_APP_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const randomPage = Math.floor(Math.random() * 500);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [buttonText, setButtonText] = useState(`Suggest Film`);
  const [buttonIcon, setButtonIcon] = useState(faPlay);
  const [rating, setRating] = useState("");
  const lastIndexRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const pickedGenre = movieDetails.selectedGenre;
      const pickedActorID = movieDetails.selectedActorID;
      const pickedDirectorID = movieDetails.selectedDirectorID;

      /* URL JUST TO GET A RANDOM MOVIE FROM TMDB */
      let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&primary_release_date.gte=1990`;

      // HAS A GENERE BEEN PICKED?
      if (pickedGenre && pickedGenre !== "any") {
        url += `&with_genres=${pickedGenre}`;
      }

      // HAS A RATING BEEN SELECTED?
      if (rating === 1) {
        url += `&vote_average.gte=0&vote_average.lte=2`;
      } else if (rating === 2) {
        url += `&vote_average.gte=3&vote_average.lte=4`;
      } else if (rating === 3) {
        url += `&vote_average.gte=5&vote_average.lte=6`;
      } else if (rating === 4) {
        url += `&vote_average.gte=7&vote_average.lte=9`;
      } else if (rating === 5) {
        url += `&vote_average.gte=10`;
      }

      // HAS ACTOR OR DIRECTOR BEEN PICKED?
      if (pickedActorID > 0 && pickedDirectorID > 0) {
        url += `&with_cast=${pickedActorID}&with_crew=${pickedDirectorID}`;
      } else if (pickedActorID > 0) {
        url += `&with_cast=${pickedActorID}`;
      } else if (pickedDirectorID > 0) {
        url += `&with_crew=${pickedDirectorID}`;
      } else {
        url += `&page=${randomPage}`;
      }

      const results = await fetchMovies(url, options);

      if (results && results.length > 0) {
        // GRAB A RANDOM RESULT
        let random = Math.floor(Math.random() * results.length);
        while (
          lastIndexRef.current !== null &&
          random === lastIndexRef.current
        ) {
          random = Math.floor(Math.random() * results.length);
        }
        const movie = results[random];

        // STORE THE RESULT IN STATE
        const ratingOutOfFive = movie.vote_average / 2;
        const dateParts = movie.release_date.split("-");
        const releaseDate =
          dateParts.length === 3 ? dateParts[0] : "Invalid Date Format";

        setMovieDetails((prevState) => ({
          ...prevState,
          movieID: movie.id,
          movieName: movie.title,
          movieGenres: movie.genre_ids,
          movieRating: Math.round(ratingOutOfFive),
          moviePosterPath: movie.poster_path,
          movieBackdrop: movie.backdrop_path,
          movieReleaseDate: releaseDate,
          movieOverview: movie.overview,
        }));
        lastIndexRef.current = random;
        setShowResult(true);
      }
    };

    if (formSubmitted) {
      fetchData();
      setFormSubmitted(false);
      setButtonText("Suggest Another");
      setButtonIcon(faRotate);
    }
  }, [formSubmitted, movieDetails, rating]);

  useEffect(() => {
    const fetchMovieMeta = async () => {
      if (movieDetails.movieID) {
        const movieMeta = await fetchMovieDetails(
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
                current.published_at < earliest.published_at
                  ? current
                  : earliest
              )
            : null;

        if (earliestTrailer?.key) {
          setMovieDetails((prevState) => ({
            ...prevState,
            movieTrailer:
              `https://www.youtube.com/watch?v=` + earliestTrailer.key,
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
    fetchMovieMeta();
  }, [movieDetails.movieID]);

  useEffect(() => {
    console.log(movieDetails);
  }, [movieDetails.movieRunTime]);

  return (
    <div className="container">
      <h1>Movie Picker</h1>
      <p>
        Use this to search for a random film to watch. Use the options to get
        more specific or just get a random one.
      </p>
      {showResult && <ResultCard movie={movieDetails} />}
      <MoviePickerForm
        setMovieDetails={setMovieDetails}
        options={options}
        movieDetails={movieDetails}
        setFormSubmitted={setFormSubmitted}
      />
      <button className="btn" type="submit" form="moviePicker">
        {buttonText} <FontAwesomeIcon icon={buttonIcon} />
      </button>
      {showResult && <p className="credits">Data provided by JustWatch</p>}
    </div>
  );
}
