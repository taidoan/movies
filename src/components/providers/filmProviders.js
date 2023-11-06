import providers from "../providers/filmProviders.module.scss";

export const StreamingProviders = ({ movie }) => {
  return (
    <div className={providers.providers}>
      <span className={providers.heading}>Stream On:</span>
      <div className={providers.list}>
        {movie.movieStreamingProviders.map((item, index) => (
          <a
            href={movie.movieWatchLink}
            target="_blank"
            className={providers.link}
            rel="noopener noreferrer"
            key={index}
            title={`Stream on ${item.provider_name}`}
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
              alt={item.provider_name}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export const BuyMovieProviders = ({ movie }) => {
  return (
    <div className={providers.providers}>
      <span className={providers.heading}>Buy From:</span>
      <div className={providers.list}>
        {movie.movieBuyProviders.map((item, index) => (
          <a
            href={movie.movieWatchLink}
            target="_blank"
            className={providers.link}
            rel="noopener noreferrer"
            key={index}
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
              alt={item.provider_name}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export const RentMovieProviders = ({ movie }) => {
  return (
    <div className={providers.providers}>
      <span className={providers.heading}>Rent From:</span>
      <div className={providers.list}>
        {movie.movieRentProviders.map((item, index) => (
          <a
            href={movie.movieWatchLink}
            target="_blank"
            className={providers.link}
            rel="noopener noreferrer"
            key={index}
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
              alt={item.provider_name}
            />
          </a>
        ))}
      </div>
    </div>
  );
};
