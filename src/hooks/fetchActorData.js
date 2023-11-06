export const fetchActorData = async (selectedActor, options) => {
  if (selectedActor) {
    const url = `https://api.themoviedb.org/3/search/person?query=${selectedActor}&include_adult=false&language=en-US&page=1`;

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const results = data.results;
      let id = "";
      let name = "";

      if (results.length > 0) {
        id = results[0].id;
        name = results[0].name;
      }
      return { id, name };
    } catch (error) {
      console.log("Error:", error);
      return { id: "", name: "" };
    }
  }
  return { id: "", name: "" };
};
