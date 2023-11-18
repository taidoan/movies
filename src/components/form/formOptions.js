import formStyles from "./form.module.scss";
import { SetRating } from "../ratings/filmRatings";
import { useCallback, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

const FormOptions = ({
  selectedGenre,
  handleGenreChange,
  actorRef,
  directorRef,
  yearRef,
  setRating,
}) => {
  const useToggleOptions = () => {
    return useCallback(() => {
      const form = document.getElementById("formOptions");
      const button = document.getElementById("toggleOptions");
      const formContainer = document.getElementById("moviePicker");
      form.style.display =
        form.style.display === "none" || form.style.display === ""
          ? "block"
          : "none";
      button.classList.toggle(formStyles.buttonExpanded);
      formContainer.classList.toggle(formStyles.mainExpanded);
    }, []);
  };

  const handleResetRating = () => {
    document.getElementById("moviePicker").reset();
    window.setRatingReset();
  };

  const toggleOptions = useToggleOptions();
  const thisYear = new Date().getFullYear();

  return (
    <>
      <button
        className={formStyles.button}
        onClick={toggleOptions}
        type="button"
        id="toggleOptions"
      >
        Options
      </button>
      <div className={formStyles.form} id="formOptions">
        <div className={formStyles.innerForm}>
          <label htmlFor="genres" className={formStyles.form_label}>
            Genre:
          </label>
          <select
            id="genres"
            value={selectedGenre}
            onChange={handleGenreChange}
            className={formStyles.options_field}
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
          <label className={formStyles.form_label}>Year:</label>
          <input
            id="year"
            type="number"
            min="1900"
            max={thisYear}
            ref={yearRef}
            autoComplete="off"
            aria-autocomplete="none"
            className={formStyles.input_field}
            placeholder="YYYY"
          ></input>
          <SetRating setRating={setRating} />
          <label htmlFor="actor" className={formStyles.form_label}>
            Actor:
          </label>
          <input
            type="text"
            id="actor"
            ref={actorRef}
            className={formStyles.input_field}
            autoComplete="off"
            aria-autocomplete="none"
          ></input>
          <label htmlFor="director" className={formStyles.form_label}>
            Director:
          </label>
          <input
            type="text"
            id="director"
            name="director"
            ref={directorRef}
            className={formStyles.input_field}
            autoComplete="off"
            aria-autocomplete="none"
          ></input>
          <button
            type="button"
            onClick={handleResetRating}
            className={formStyles.reset_button}
          >
            Reset <FontAwesomeIcon icon={faUndo} />
          </button>
        </div>
      </div>
    </>
  );
};

export default FormOptions;
