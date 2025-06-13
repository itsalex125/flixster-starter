import React from "react";
import "./SideBar.css";

export default function SideBar({movie, likedMovies, watchedMovies}){
    const likedList = movie.filter((m)=> likedMovies.has(m.id));
    const watchedList = movie.filter((m)=> watchedMovies.had(m.id));

    return(
        <aside className="sidebar">
            <div className="side-bar section">
                <h3> Liked</h3>
                {likedList.length === 0 ? (
                    <p>No liked movies</p>
                ) : (
                    likedList.map((movie) => <p key={movie.id}>{movie.title}</p>) 
                )}
            </div>
                <div className="side-bar section">
                <h3> Liked</h3>
                {watchedList.length === 0 ? (
                    <p>No liked movies</p>
                ) : (
                    watchedList.map((movie) => <p key={movie.id}>{movie.title}</p>) 
                )}
            </div>
        </aside>

    );
}
