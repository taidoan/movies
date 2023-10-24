import { useEffect, useState } from "react";

const MovieSearch = () => {
  const [list, setList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isSubmitted, setIsSubmitted] = useState("");

  useEffect(() => {
    if (isSubmitted) {
      const fetchMovies = async () => {
        const apiKey =
          "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWQxYjY1MTk3MDJhMGM4YWEyMDljMDgyMGZkNzYwZCIsInN1YiI6IjY1MmZiNTQ2YTgwMjM2MDBmZDJkOWI0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T4_lz5dW_04-vBkYjVXrA8w25MKLsPYqqiBj0t5CpLM";
        const randomPage = Math.floor(Math.random() * 500);
        let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${randomPage}&primary_release_date.gte=1990`;

        if (selectedGenre) {
          url += `&with_genres=${selectedGenre}`;
        }

        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          const results = data.results;
          setList(results);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchMovies();
      setIsSubmitted(false);
    }
  }, [isSubmitted, selectedGenre]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  const style = {
    width: "200px",
    height: "200px",
    display: "block",
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="genres">Genre</label>
        <select id="genres" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Select a genre</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="27">Horror</option>
          <option value="10752">War</option>
        </select>
        <button type="submit">Search</button>
      </form>
      {list.map((movie) => (
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          <span>{movie.release_date}</span>
          <p>{movie.overview}</p>
          <img
            src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
            style={style}
            alt="test"
          />
        </div>
      ))}
    </div>
  );
};

export default MovieSearch;
