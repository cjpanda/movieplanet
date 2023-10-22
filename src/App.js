import { useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
import { useState } from "react";



const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=d44064c7'



const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json()

    setMovies(data.Search)

  }

  useEffect(() => {
    searchMovies('Superman');
  },[])

  return (
    <div className="app">
      <h1>Movie Planet</h1>

      <div className="search">
        <input 
          placeholder="Search Movies"
          value = {searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon} 
          alt="search" 
          onClick={() => searchMovies(searchTerm)}
        />
      </div>


    {movies?.length > 0 ? (
      <div className="container">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie}/>
        ))}
      </div>
    ): (
      <div className="empty">
        <h2>No Movies Found</h2>
      </div>
    )}

    </div>
  )
}

export default App;