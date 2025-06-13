import React from "react";

function MovieCard({movie, onImageClick, isLiked, toggleWatched, toggleLiked, isWatched}){
    return(
        <div className = "movie-card">
        <img src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt= {`${movie.title}`}
        onClick={onImageClick}/> 
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-rating">Rating: {movie.vote_average}</p>
        <button onClick={toggleLiked}>
        {isLiked ? "❤️ Liked" : "🤍 Like"}
        </button>
        <button onClick={toggleWatched}>
        {isWatched ? "👀 Watched":"❌ Not Watched"}
        </button>
        </div>
    );
}

export default MovieCard;