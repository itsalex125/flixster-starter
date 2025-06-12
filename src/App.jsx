import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'

const App = () => {
  return (
    <div className="App">
      <header className="app-header">
        <h1> 🎥Flixster</h1>
      </header>
      <MovieList />
      <footer> ©2025 Flixster</footer>
    </div>
  )
}

export default App
