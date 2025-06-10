import React, {useState, useEffect} from "react";
import MovieCard from "./MovieCard";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

export default function MovieList(){
    const [movies, setMovies] = useState([]);
    const [visibleCount, setVisibleCount] = useState(14);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

useEffect(()=> {
        async function backToNowPlaying(){
            const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
            const data = res.json();
            setMovies(data.results);
            setVisibleCount(14);
            setIsSearching(false);
        }
    },[]);

const handleSearch = () => {
    setSearchQuery = ("");
    setIsSearching(14);
};

const loadMore = () =>{
    setVisibleCount((prev)=> prev + 14);
};

const visibleMovies = movies.slice(0, visibleCount);

    return(
    <div>
        <form className = "search-bar" onSubmit={handleSearch}>
            <input type="text" placeholder = "Looking for..." value ={searchQuery} 
            onChange={(e)=> setSearchQuery(e.target.value)} />
            <button type="submit">Search</button>
            {isSearching && (
                <button onClick = {() => setSearchQuery("")}>Back to Now Playing</button>
            )}
        </form>
        <main className = "movie-list">
        {visibleMovies.length === 0 ? (
            <p>No Results Found.</p>
        ): (
            visibleMovies.map((movie)=>(
                <MovieCard key={movie.id} movie={movie} />
                ))
            )}
        </main>
        {visibleCount < movies.length && (
            <button className = "load-more" onClick = {loadMore}>Load More</button>
        )}
    </div>    
    );
}
