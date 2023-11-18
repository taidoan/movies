import btns from "./../../styles/buttons.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const WatchTrailer = ({ link }) => {
  return (
    <a
      href={link.movieTrailer}
      target="_blank"
      rel="noopener noreferrer"
      className={btns.cardButton}
      title={`Watch The Trailer For ${link.movieName} on YouTube.`}
    >
      Watch Trailer <FontAwesomeIcon icon={faYoutube} />
    </a>
  );
};

export default WatchTrailer;
