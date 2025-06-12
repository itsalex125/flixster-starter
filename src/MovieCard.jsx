import React from "react";

function MovieCard({movie, onImageClick, onHeartClick, onWatchedClick}){
    return(
        <div className = "movie-card">
        <img src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        onClick={onImageClick}/>
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-rating">Rating: {movie.vote_average}</p>
        <button onClick={onHeartClick}>❤</button>
        <button className="Watched" 
        onClick ={onWatchedClick}>Watched</button>
        </div>
    );
}

export default MovieCard;