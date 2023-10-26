import options from "./styles/components/options.module.scss";

const FormOptions = ({ selectedGenre, handleGenreChange }) => {
  return (
    <div className={options.form} id="formOptions">
      <label htmlFor="genres">Genre</label>
      <select id="genres" value={selectedGenre} onChange={handleGenreChange}>
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
      {/* <label htmlFor="actor">Actor</label>
      <input
        type="text"
        id="actor"
        value={SelectedActorID}
        onChange={handleActor}
      ></input> */}
      <label htmlFor="director">Director</label>
      <input type="text" id="director"></input>
    </div>
  );
};

export default FormOptions;
