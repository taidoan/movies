import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWQxYjY1MTk3MDJhMGM4YWEyMDljMDgyMGZkNzYwZCIsInN1YiI6IjY1MmZiNTQ2YTgwMjM2MDBmZDJkOWI0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T4_lz5dW_04-vBkYjVXrA8w25MKLsPYqqiBj0t5CpLM",
      },
    };

    const randomNumber = Math.floor(Math.random() * 500);

    fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${randomNumber}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        const results = data.results;
        setList(results);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="App">
      {list.map((movie) => (
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          <span>{movie.release_date}</span>
          <p>{movie.overview}</p>
          {/* Add other relevant data to display */}
        </div>
      ))}
    </div>
  );
}

export default App;
