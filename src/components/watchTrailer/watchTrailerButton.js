import button from "./watchTrailerButton.module.scss";

const WatchTrailer = ({ link }) => {
  return (
    <a
      href={link.movieTrailer}
      target="_blank"
      rel="noopener noreferrer"
      className={button.watchTrailer}
    >
      Watch Trailer
    </a>
  );
};

export default WatchTrailer;
