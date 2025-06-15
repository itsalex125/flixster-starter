import { useState, useEffect } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const useMovies = ()=>{
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
    
    return{
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
    };
};