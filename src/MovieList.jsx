import React, {useState, useEffect} from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

export default function MovieList(){
    const[movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const[totalPage, setTotalPages] = useState(1);
    const[selectedMovie, setSelectedMovie] = useState(null);

    useEffect(()=>{
        fetchNowPlaying(1);
    }, []);

    const fetchNowPlaying = async (pageNumber) => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${pageNumber}`
            );
            const data = await response.json();
            if(pageNumber === 1){
                setMovies(data.results || []);
            }else{
            setMovies((prev)=> {
                const existingIds = new Set(prev.map((m)=> m.id));
                const newMovies = data.results.filter((m)=> !existingIds.has(m.id));
                return [...prev, ...newMovies]
            });
            }
            setPage(pageNumber);
            setTotalPages(data.total_pages);
            setIsSearching(false);
    };

const fetchSearchResults = async (query, pageNumber) => {
            const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}}`
                );
            const data = await response.json();
            if(pageNumber === 1) {
                setMovies(data.results || []);
            }else {
                setMovies((prev) => {
                    const existingIds = new Set(prev.map((m) => m.id));
                    const newMovies = data.results.filter((m)=>!existingIds.has(m.id));
                    [...prev, ...newMovies];
                });
            }

            
            setPage(pageNumber);
            setTotalPages(data.total_pages);
            setIsSearching(true);
};

const handleLoadMore = () => {
    const nextPage = page + 1;

    if(nextPage <= totalPage){
        if(isSearching){
            fetchSearchResults(searchQuery, nextPage);
        }else{
            fetchNowPlaying(nextPage);
        }
    }
};

const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchQuery.trim()) return;

    await fetchSearchResults(searchQuery.trim(), 1);
};

const handleBack = async() => {
    setSearchQuery("");
    setPage(1);
    setTotalPages(1);
    await fetchNowPlaying(1);
};

const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
};

const handleMovieClick = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/now-playing/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    setSelectedMovie(data);
};

const safeMovies = Array.isArray(movies) ? movies : [];

    return(
    <div>
        <form className = "search-bar" onSubmit={handleSearch}>
            <input type="text" placeholder = "Looking for..." value ={searchQuery} 
            onChange={handleSearchChange} />
            <button type="submit">Search</button>
            {isSearching && (
                <button type="button" onClick = {handleBack}>clear</button>
            )}
        </form>
        <main className = "movie-list">
            {safeMovies.length === 0 ? (
                <p>No results found.</p>
            ) : (
                safeMovies.map((movie)=> <MovieCard key = {movie.id} movie = {movie} onClick={handleMovieClick}/> )
            )}
        </main>
        {page < totalPage && (
            <button className = "load-more" onClick={handleLoadMore}>
                Load More
            </button>
        )}
        {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={()=>setSelectedMovie(null)} />
        )}
    </div>    
    );
}
