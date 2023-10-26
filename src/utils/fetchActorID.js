export const fetchActorID = async (selectedActor, options) => {
  if (selectedActor) {
    const url = `https://api.themoviedb.org/3/search/person?query=${selectedActor}&include_adult=false&language=en-US&page=1`;

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const results = data.results;
      let id = "";

      if (results.length > 0) {
        id = results[0].id;
      } else {
        id = "";
      }
      return id;
    } catch (error) {
      console.log("Error:", error);
      return "";
    }
  }
  return "";
};
