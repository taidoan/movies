import styles from "./styles.module.scss";
import { register } from "swiper/element/bundle";

export const SimilarMovies = (similar) => {
  register();

  return (
    <swiper-container
      class={styles["swiper-container"]}
      slides-per-view="2"
      space-between="16"
      grab-cursor="true"
      pagination="true"
      auto-height="true"
    >
      {similar.similar.map((movie) => (
        <swiper-slide key={movie.id} class={styles.card}>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            className={styles.posterImage}
          />
          <span className={styles.title}>{movie.title}</span>
        </swiper-slide>
      ))}
    </swiper-container>
  );
};
