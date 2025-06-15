import React, {useState} from "react";
import MovieModal from "./MovieModal";
import SideBar from "./SideBar";
import{useMovies} from "./useMovies";
import { sortMovies } from "./sortUtils";

export default function MovieList(){

    const[sortOptions, setSortOptions] = useState("Title");
    const{
        movies,
        page,
        searchQuery,
        isSearching,
        totalPage,
        selectedMovie,
        isModalOpen,
        isWatched,
        isLiked,
        setSearchQuery,
        setIsSearching,
        fetchNowPlaying,
        fetchSearchResults,
        handleModalClose,
        handleModalOpen,
        onToggleLiked,
        onToggleWatched
    } = useMovies();

const handleSortChange = (event) =>{
    setSortOptions(event.target.value);
}

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
    setIsSearching(false);
    await fetchNowPlaying(1);
};

const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
};

const sortedMovies = sortMovies(movies, sortOptions);

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
            movies={sortedMovies}
            likedMovies={isLiked}
            watchedMovies = {isWatched}
            onImageClick={handleModalOpen}
            toggleLiked={onToggleLiked}
            toggleWatched={onToggleWatched}
            />
        {page < totalPage && !isSearching &&(
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