const this_year = (new Date()).getFullYear();
const years = [];
for (let i = 1910; i <= this_year; ++i) {
    years.push(i);
}
const initState = {
    years: years,
    chosenYear: localStorage.getItem("chosenYear") ?? (new Date()).getFullYear(),
    moviesForYear1: [],
    moviesForYear2: [],
    chosenGenreId: localStorage.getItem("chosenGenreId") ?? "",
    chosenGenreName: localStorage.getItem("chosenGenreName") ?? "",
    yearForGenre: localStorage.getItem("yearForGenre") ?? "2020",
    moviesWithGenre1: [],
    moviesWithGenre2: [],
    chosenMovie: localStorage.getItem("chosenMovie") ?? "",
    chosenMovieDetails: [],
    chosenMoviePlot: "",
    chosenMovieCast: [],
    chosenMovieImages: [],
    chosenMovieExtraDetails: {},
    chosenActorId: localStorage.getItem("chosenActor") ?? "",
    chosenActorDetails: {},
    chosenActorMovies: [],
    chosenActorTv: [],
    searchQuery: localStorage.getItem("searchQuery") ?? "",
    moviesForQuery: [],
    actorsForQuery: [],
    tvShowsForQuery: []
}
const movieReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_TRENDING_MOVIES":
            return {
                ...state,
                trending: action.trending
            };
        case "GET_UPCOMING_MOVIES":
            return {
                ...state,
                upcoming: action.upcoming
            };
        case "SET_CHOSEN_GENRE":
            console.log("setting genre", action);
            return {
                ...state,
                chosenGenreId: action.id,
                chosenGenreName: action.name,
                yearForGenre: action.year
            }
        case "GET_MOVIES_WITH_GENRE1":
            return {
                ...state,
                moviesWithGenre1: action.movies
            }
        case "GET_MOVIES_WITH_GENRE2":
            return {
                ...state,
                moviesWithGenre2: action.movies
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
        case "GET_MOVIES_FOR_YEAR1":
            return {
                ...state,
                moviesForYear1: action.movies
            }
        case "GET_MOVIES_FOR_YEAR2":
            return {
                ...state,
                moviesForYear2: action.movies
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
        case "GET_CHOSEN_MOVIE_IMAGES":
            return {
                ...state,
                chosenMovieImages: action.images
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
                chosenActorDetails: action.actor_details
            }
        case "GET_CHOSEN_ACTOR_MOVIES":
            return {
                ...state,
                chosenActorMovies: action.actor_movies
            }
        case "GET_CHOSEN_ACTOR_TV":
            return {
                ...state,
                chosenActorTV: action.actor_tv_shows
            }
        case "SET_SEARCH_QUERY":
            return {
                ...state,
                searchQuery: action.query
            }
        case "GET_QUERY_MOVIES":
            return {
                ...state,
                moviesForQuery: action.movies
            }
        case "GET_QUERY_ACTORS":
            return {
                ...state,
                actorsForQuery: action.actors
            }
        case "GET_QUERY_TV_SHOWS":
            return {
                ...state,
                tvShowsForQuery: action.tv_shows
            }
        default:
            return state;
    }
}
export default movieReducer;