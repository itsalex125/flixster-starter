import React from "react";
import "./MovieModal.css";

function MovieModal({movie}){
    if(!onOpen){
        return null;
    } 

    const genreName = movie.genres?.map((g)=> g.name).join(", ");

    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick ={(e) => e.stopPropagation()}>
                <h2 className="modal-title">{movie.title}</h2>
                <img className="modal-image" src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt ={`${movie.title} backdrop`} />
                <p>Release Date:{movie.release_date}</p>
                <p>Runtime:{movie.runtime}</p>
                <p>Overview:{movie.overview}</p>
                <p>Genres:{genreName}</p>
                <button className="modal-close" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
export default MovieModal;