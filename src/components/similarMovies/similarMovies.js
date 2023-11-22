import styles from "./styles.module.scss";
import { register } from "swiper/element/bundle";
import { useEffect, useRef } from "react";
register();

export const SimilarMovies = (similar) => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    const swiperEl = document.querySelector("swiper-container");
    const swiperParams = {
      slidesPerView: 2,
      spaceBetween: 12,
      grabCursor: true,
      autoHeight: true,
      pagination: true,
      breakpoints: {
        500: {
          slidesPerView: 3,
        },
        700: {
          slidesPerView: 4,
        },
        1000: {
          slidesPerView: 5,
        },
      },
      on: {
        init() {},
      },
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
  }, []);

  return (
    <swiper-container
      class={styles["swiper-container"]}
      init="false"
      ref={swiperElRef}
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
