import React, {useState} from "react";
import "./SideBar.css";
import MovieCard from "./MovieCard"

export default function SideBar({movies, likedMovies, watchedMovies, onImageClick, toggleLiked, toggleWatched}){
    const [activeTab, setActiveTab] = useState("home");

    const renderMovies = () =>{
        switch(activeTab){
            case "liked":
                return movies.filter(movie => likedMovies.has(movie.id));
            case "watched":
                return movies.filter(movie => watchedMovies.has(movie.id));
            default:
                return movies;
        }
    };

    return(
        <div className="sidebar-container">
            <div className="sidebar-tabs">
                <button className={`tab-button ${activeTab === "home" ? "active": ""}`}
                onClick={() => setActiveTab("home")}>
                    🏠 Home
                </button>
                <button className={`tab-button ${activeTab === "liked" ? "active": ""}`}
                onClick={() => setActiveTab("liked")}>
                    ❤️ Liked
                </button>
                <button className={`tab-button ${activeTab === "watched" ? "active": ""}`}
                onClick={() => setActiveTab("watched")}>
                    👀 Watched
                </button>
            </div>
            <div className="movie-list">
                {renderMovies().length === 0 ? (
                    <p className="no-movies">No movies to show</p>
                ) : (
                    renderMovies().map((movie) =>(
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isLiked={likedMovies.has(movie.id)}
                            isWatched={watchedMovies.has(movie.id)}
                            onImageClick={()=> onImageClick(movie.id)}
                            toggleLiked={()=> toggleLiked(movie.id)}
                            toggleWatched={()=>toggleWatched(movie.id)}
                            />
                    ))
                )}
            </div>
        </div>
    );
}
