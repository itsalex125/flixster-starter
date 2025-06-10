import React from "react";

function MovieCard({movie}){
    return(
        <div className = "movie-card">
        <img src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-rating">Rating: {movie.vote_average}</p>
        </div>
    );
}

export default MovieCard;