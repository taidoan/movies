const FormOptions = () => {
  return (
    <div className="form-options" id="formOptions">
      <label htmlFor="genres">Genre</label>
      <select id="genres">
        <option value="">Select a genre</option>
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="16">Animation</option>
        <option value="27">Horror</option>
        <option value="10752">War</option>
      </select>
      <label htmlFor="actor">Actor</label>
      <input type="text" id="actor"></input>
      <label htmlFor="director">Director</label>
      <input type="text" id="director"></input>
    </div>
  );
};

export default FormOptions;
