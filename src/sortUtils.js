export const sortMovies = (movies, sortOption) => {
    const sortedMovies = [...movies];

    switch(sortOption){
        case "title":
            sortedMovies.sort((a,b) => a.title.localeCompare(b.title));
            break;
        case "rating":
            sortedMovies.sort((a,b) => b.vote_average - a.vote_average);
            break;
        case "date":
            sortedMovies.sort((a,b) => Date(b.release_date) - new Date(a.release_date));
            break;
        default:
            break;
        
    }

    return sortedMovies;
};