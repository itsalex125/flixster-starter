import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'

const App = () => {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Flixster</h1>
          {/* <select>
            <option>Sort by</option>
            <option>Rating: Descending</option>
            <option>Popularity: Descending</option>
            <option>Release Date: Descending</option>
          </select> */}
      </header>
      <MovieList />
      <footer>2025 Flixster</footer>
    </div>
  )
}

export default App
