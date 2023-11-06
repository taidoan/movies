import options from "./../../styles/components/options.module.scss";
import { SetRating } from "../ratings/filmRatings";
import { useCallback } from "react";

const FormOptions = ({
  selectedGenre,
  handleGenreChange,
  actorRef,
  directorRef,
  setRating,
}) => {
  const useToggleOptions = () => {
    return useCallback(() => {
      const form = document.getElementById("formOptions");
      const button = document.getElementById("toggleOptions");
      form.style.display =
        form.style.display === "none" || form.style.display === ""
          ? "grid"
          : "none";
      button.classList.toggle(options["button--expanded"]);
    }, []);
  };
  const toggleOptions = useToggleOptions();

  return (
    <div className={options.container}>
      <button
        className={options.button}
        onClick={toggleOptions}
        type="button"
        id="toggleOptions"
      >
        Options
      </button>
      <div className={options.form} id="formOptions">
        <label htmlFor="genres" className={options.form_label}>
          Genre
        </label>
        <select
          id="genres"
          value={selectedGenre}
          onChange={handleGenreChange}
          className={options.options_field}
        >
          <option value="any">Any</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="36">History</option>
          <option value="27">Horror</option>
          <option value="10402">Music</option>
          <option value="9648">Mystery</option>
          <option value="10749">Romance</option>
          <option value="878">Science Fiction</option>
          <option value="10770">TV Movie</option>
          <option value="53">Thriller</option>
          <option value="10752">War</option>
          <option value="37">Western</option>
        </select>
        <SetRating setRating={setRating} />
        <label htmlFor="actor" className={options.form_label}>
          Actor
        </label>
        <input
          type="text"
          id="actor"
          ref={actorRef}
          className={options.input_field}
          autoComplete="off"
          aria-autocomplete="none"
        ></input>
        <label htmlFor="director" className={options.form_label}>
          Director
        </label>
        <input
          type="text"
          id="director"
          name="director"
          ref={directorRef}
          className={options.input_field}
          autoComplete="off"
          aria-autocomplete="none"
        ></input>
      </div>
    </div>
  );
};

export default FormOptions;
