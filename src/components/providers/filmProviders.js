import providers from "../providers/filmProviders.module.scss";

export const StreamingProviders = ({ movie }) => {
  return (
    <div className={providers.providerList}>
      <span className={providers.providerHeading}>Stream On:</span>
      {movie.movieStreamingProviders.map((item, index) => (
        <div key={index}>
          <a
            href={movie.movieWatchLink}
            target="_blank"
            className={providers.providerLink}
            rel="noopener noreferrer"
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
              alt={item.provider_name}
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export const BuyMovieProviders = ({ movie }) => {
  return (
    <div className={providers.providerList}>
      <span className={providers.providerHeading}>Buy From:</span>
      {movie.movieBuyProviders.map((item, index) => (
        <div key={index}>
          <a
            href={movie.movieWatchLink}
            target="_blank"
            className={providers.providerLink}
            rel="noopener noreferrer"
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
              alt={item.provider_name}
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export const RentMovieProviders = ({ movie }) => {
  return (
    <div className={providers.providerList}>
      <span className={providers.providerHeading}>Rent From:</span>
      {movie.movieRentProviders.map((item, index) => (
        <div key={index}>
          <a
            href={movie.movieWatchLink}
            target="_blank"
            className={providers.providerLink}
            rel="noopener noreferrer"
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
              alt={item.provider_name}
            />
          </a>
        </div>
      ))}
    </div>
  );
};
