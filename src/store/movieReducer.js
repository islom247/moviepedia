const this_year = (new Date()).getFullYear();
const years = [];
for (let i = 1910; i <= this_year; ++i) {
    years.push(i);
}
const initState = {
    chosenYear: localStorage.getItem("chosenYear") ? localStorage.getItem("chosenYear") : (new Date()).getFullYear(),
    moviesWithGenre1: [],
    moviesWithGenre2: [],
    moviesForYear1: [],
    moviesForYear2: [],
    years: years,
    chosenGenreId: localStorage.getItem("chosenGenreId") ?? "",
    chosenGenreName: localStorage.getItem("chosenGenreName") ?? "",
    yearForGenre: localStorage.getItem("yearForGenre") ?? "2020",
    chosenMovie: localStorage.getItem("chosenMovie") ?? "",
    chosenMovieDetails: [],
    chosenMoviePlot: "",
    chosenMovieCast: [],
    chosenMovieExtraDetails: {},
    chosenActorId: localStorage.getItem("chosenActor") ?? "",
    chosenActorDetails: localStorage.getItem("chosenActorDetails") ?? {},
    chosenActorMovies: localStorage.getItem("chosenActorMovies") ?? [],
    chosenActorTv: localStorage.getItem("chosenActorTV") ?? [],
    searchQuery: "",
    moviesForQuery: [],
    actorsForQuery: []

}
const movieReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_HOMEPAGE_MOVIES":
            return {
                ...state,
                trending: action.trending,
                upcoming: action.upcoming
            };
        case "SET_CHOSEN_GENRE":
            console.log("setting genre", action);
            return {
                ...state,
                chosenGenreId: action.id,
                chosenGenreName: action.name
            }
        case "GET_MOVIES_WITH_GENRE":
            return {
                ...state,
                moviesWithGenre1: action.movies1,
                moviesWithGenre2: action.movies2
            }
        case "SET_YEAR_FOR_GENRE":
            return {
                ...state,
                yearForGenre: action.year
            }
        case "SET_CHOSEN_YEAR":
            return {
                ...state,
                chosenYear: action.year
            }
        case "GET_MOVIES_FOR_YEAR":
            return {
                ...state,
                moviesForYear1: action.movies1,
                moviesForYear2: action.movies2
            }
        case "SET_CHOSEN_MOVIE":
            return {
                ...state,
                chosenMovie: action.id
            }
        case "GET_CHOSEN_MOVIE_DETAILS":
            return {
                ...state,
                chosenMovieDetails: action.details
            }
        case "GET_CHOSEN_MOVIE_EXTRA_DETAILS":
            console.log("HERE", action.extra_details);
            return {
                ...state,
                chosenMovieExtraDetails: action.extra_details
            }
        case "GET_CHOSEN_MOVIE_CAST":
            return {
                ...state,
                chosenMovieCast: action.cast
            }
        case "SET_CHOSEN_ACTOR":
            console.log("LLOL", action.actor_id);
            return {
                ...state,
                chosenActorId: action.actor_id
            }
        case "GET_CHOSEN_ACTOR_DETAILS":
            return {
                ...state,
                chosenActorDetails: action.actor_details,
                chosenActorMovies: action.actor_movies,
                chosenActorTV: action.tv_shows
            }
        case "SET_SEARCH_QUERY":
            return {
                ...state,
                searchQuery: action.query
            }
        case "GET_QUERY_RESULTS":
            return {
                ...state,
                moviesForQuery: action.movies,
                actorsForQuery: action.actors
            }
        default:
            return state;
    }
}
export default movieReducer;