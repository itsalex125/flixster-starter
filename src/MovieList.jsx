import React, {useState, useEffect} from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import SideBar from "./SideBar";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

export default function MovieList(){
    const[movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const[totalPage, setTotalPages] = useState(1);
    const[selectedMovie, setSelectedMovie] = useState(null);
    const[isModalOpen, setIsModalOpen] = useState(false);
    const[sortOptions, setSortOptions] = useState("Title");
    const[isWatched, setIsWatched] = useState(new Set());
    const[isLiked, setIsLiked] = useState(new Set());
    
    useEffect(()=>{
        fetchNowPlaying(1);
    }, []);
    
    const handleSortChange = (e)=>{
        setSortOptions(e.target.value)
    };

    const handleModalOpen = async (movieId) => {
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
        const movieData = await movieResponse.json();

        const trailerResponse= await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
        const trailerData = await trailerResponse.json();

        const trailer = trailerData.results?.find(video => video.type === "Trailer" && video.site === "YouTube");

        setSelectedMovie({
            ...movieData,
            trailer: trailer ? trailer.key : null
        });
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);   
    }

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
};

const handleLoadMore = () => {
    const nextPage = page + 1;

    if(nextPage <= totalPage){
        if(searchQuery.trim() !== ""){
            fetchSearchResults(searchQuery, nextPage);
        }else{
            fetchNowPlaying(nextPage);
        }
    }
};

const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchQuery.trim()) return;

    setIsSearching(true);
    await fetchSearchResults(searchQuery.trim(), 1);
};

const handleBack = async() => {
    setSearchQuery("");
    setPage(1);
    setTotalPages(1);
    setIsSearching(false);
    await fetchNowPlaying(1);
};

const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
};


const saveMovies = Array.isArray(movies) ? [...movies] : [];

if(sortOptions === "title"){
    saveMovies.sort((a,b) => a.title.localeCompare(b.title));
}
else if(sortOptions === "rating"){
    saveMovies.sort((a,b) => b.vote_average - a.vote_average);
}
else if(sortOptions === "date"){
    saveMovies.sort((a,b) =>{
        return new Date(b.release_date) - new Date(a.release_date);
    });
}

const onToggleLiked = (movieId) =>{
    setIsLiked((prev)=>{
        const newSet = new Set(prev)
        newSet.has(movieId) ? newSet.delete(movieId) : newSet.add(movieId);
        return newSet;
    });
};

const onToggleWatched = (movieId) =>{
    setIsWatched((prev)=>{
        const newSet = new Set(prev)
        newSet.has(movieId) ? newSet.delete(movieId) : newSet.add(movieId);
        return newSet;
    });
};



    return(
    <div> 
        <select value={sortOptions} onChange={handleSortChange}>
            <option>Sort by</option>
            <option value="title">Title (A-Z)</option>
            <option value="rating">Popularity: descending</option>
            <option value="date">Release: descending</option>
        </select>
        <form className = "search-bar" onSubmit={handleSearch}>
            <input type="text" placeholder = "Looking for..." value ={searchQuery} 
            onChange={handleSearchChange} />
            <button type="submit">Search</button>
            {isSearching && (
                <button type="button" onClick = {handleBack}>Clear</button>
            )}
        </form>
        <SideBar
            movies={saveMovies}
            likedMovies={isLiked}
            watchedMovies = {isWatched}
            onImageClick={handleModalOpen}
            toggleLiked={onToggleLiked}
            toggleWatched={onToggleWatched}
            />
        {page < totalPage && (
            <button className = "load-more" onClick={handleLoadMore}>
                Load More
            </button>
        )}
        {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleModalClose} onOpen={isModalOpen} />
        )}
    </div>    
    );
}
