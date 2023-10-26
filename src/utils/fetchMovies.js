export const fetchMovies = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};
