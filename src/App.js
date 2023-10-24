import { useEffect, useState } from "react";
import MovieResult from "./Result";
import FormOptions from "./FormOptions";

function App() {
  const [list, setList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWQxYjY1MTk3MDJhMGM4YWEyMDljMDgyMGZkNzYwZCIsInN1YiI6IjY1MmZiNTQ2YTgwMjM2MDBmZDJkOWI0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T4_lz5dW_04-vBkYjVXrA8w25MKLsPYqqiBj0t5CpLM";
      const randomPage = Math.floor(Math.random() * 500);
      let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${randomPage}&primary_release_date.gte=1990`;

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
        console.log("Error:", error);
      }
    };
    if (isSubmitted) {
      fetchMovies();
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (list.length > 0) {
      const randomIndex = Math.floor(Math.random() * list.length);
      setSelectedMovie(list[randomIndex]);
    }
  }, [list]);

  const toggleOptions = () => {
    const formOptions = document.getElementById("formOptions");
    if (
      formOptions.style.display === "none" ||
      formOptions.style.display === ""
    ) {
      formOptions.style.display = "block";
    } else {
      formOptions.style.display = "none";
    }
  };

  return (
    <div className="container">
      <h1>Movie Picker</h1>
      <p>
        Use this to search for a random film to watch. Use the options to get
        more specific or just get a random one.
      </p>
      <hr />
      <button className="btn btn-options" onClick={toggleOptions}>
        Options
      </button>
      <form onSubmit={handleSubmit}>
        <FormOptions />
        <button className="btn" type="submit">
          Click Me
        </button>
      </form>
      {selectedMovie && <MovieResult movie={selectedMovie} />}
    </div>
  );
}

export default App;
