export const fetchMovieDetails = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};
