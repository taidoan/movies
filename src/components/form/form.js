import { useRef } from "react";
import FormOptions from "./formOptions";
import { fetchPerson } from "../../hooks/fetchPerson";

const MoviePickerForm = ({
  setMovieDetails,
  options,
  movieDetails,
  setFormSubmitted,
  setRating,
}) => {
  const actorRef = useRef(null);
  const directorRef = useRef(null);
  const yearRef = useRef(null);

  const handleGenreChange = (event) => {
    setMovieDetails((prevState) => ({
      ...prevState,
      selectedGenre: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if an actor is submitted then set it's details
    if (actorRef.current.value.trim() === "") {
      setMovieDetails((prevState) => ({
        ...prevState,
        selectedActor: null,
        selectedActorID: 0,
        selectedActorName: "",
      }));
    } else {
      const { id, name } = await fetchPerson(actorRef.current.value, options);
      setMovieDetails((prevState) => ({
        ...prevState,
        selectedActor: actorRef.current.value,
        selectedActorID: id,
        selectedActorName: name,
      }));
    }

    // Check if a director is submitted

    if (directorRef.current.value.trim() === "") {
      setMovieDetails((prevState) => ({
        ...prevState,
        selectedDirector: null,
      }));
    } else {
      const { id, name } = await fetchPerson(
        directorRef.current.value,
        options
      );

      setMovieDetails((prevState) => ({
        ...prevState,
        selectedDirector: directorRef.current.value,
        selectedDirectorID: id,
        selectedDirectorName: name,
      }));
    }

    // Check if year is selected

    if (yearRef.current.value.trim() === "") {
      setMovieDetails((prevState) => ({
        ...prevState,
        selectedYear: null,
      }));
    } else {
      setMovieDetails((prevState) => ({
        ...prevState,
        selectedYear: yearRef.current.value,
      }));
    }

    setFormSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} id="moviePicker">
      <FormOptions
        selectedGenre={movieDetails.selectedGenre}
        handleGenreChange={handleGenreChange}
        actorRef={actorRef}
        yearRef={yearRef}
        directorRef={directorRef}
        setRating={setRating}
      />
    </form>
  );
};

export default MoviePickerForm;
