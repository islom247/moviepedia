import axios from "axios";

const tmdb_key = "5f9c5349c024cdd3b37a5f0f7a76e804";
const omdb_key = "6d160243&plot=full";
export const getHomepageMovies = () => {
    return (dispatch, getState) => {
        axios
            .get("https://api.themoviedb.org/3/trending/movie/day?api_key=" + tmdb_key)
            .then((response1) => {
                axios
                    .get("https://api.themoviedb.org/3/movie/upcoming?api_key=" + tmdb_key)
                    .then((response2) => {
                        dispatch({type: "GET_HOMEPAGE_MOVIES", trending: response1.data.results, upcoming: response2.data.results});
                    });
            });

    }
}
export const setChosenGenre = (id, name) => {
    return (dispatch, getState) => {
        localStorage.setItem("chosenGenreId", id);
        localStorage.setItem("chosenGenreName", name);
        localStorage.setItem("yearForGenre", "2020")
        dispatch({type: "SET_YEAR_FOR_GENRE", year: "2020"});
        dispatch({type: "SET_CHOSEN_GENRE", id: id, name: name});
    }
}
export const getMoviesWithGenre = () => {
    return (dispatch, getState) => {
        console.log("0 dispatch");
        axios
            .get("https://api.themoviedb.org/3/discover/movie?api_key=" + tmdb_key + "&with_genres=" + getState().chosenGenreId + "&primary_release_year=" + getState().yearForGenre)
            .then((response1) => {
                axios
                    .get("https://api.themoviedb.org/3/discover/movie?api_key=" + tmdb_key + "&page=2&with_genres=" + getState().chosenGenreId + "&primary_release_year=" + getState().yearForGenre)
                    .then((response2) => {
                        dispatch({type: "GET_MOVIES_WITH_GENRE", movies1: response1.data.results, movies2: response2.data.results});
                    });
            });
    }
}
export const setChosenYearForGenre = (year) => {
    return (dispatch, getState) => {
        localStorage.setItem("yearForGenre", year)
        dispatch({type: "SET_YEAR_FOR_GENRE", year: year});
    }
}
export const setChosenYear = (year) => {
    return (dispatch, getState) => {
        localStorage.setItem("chosenYear", year);
        dispatch({type: "SET_CHOSEN_YEAR", year: year});
    }
}
export const getMoviesForYear = () => {
    return (dispatch, getState) => {
        axios
            .get("https://api.themoviedb.org/3/discover/movie?include_adult=false&api_key=" + tmdb_key + "&primary_release_year=" + getState().chosenYear)
            .then((response1) => {
                axios
                    .get("https://api.themoviedb.org/3/discover/movie?api_key=" + tmdb_key + "&page=2&primary_release_year=" + getState().chosenYear)
                    .then((response2) => {
                        dispatch({type: "GET_MOVIES_FOR_YEAR", movies1: response1.data.results, movies2: response2.data.results});
                    })
            });

    }
}
export const setChosenMovie = (id) => {
    return (dispatch, getState) => {
        localStorage.setItem("chosenMovie", id);
        dispatch({type: "SET_CHOSEN_MOVIE", id: id});
    }
}
export const getChosenMovieDetails = () => {
    return (dispatch, getState) => {
        axios
            .get("https://api.themoviedb.org/3/movie/" + getState().chosenMovie + "?api_key=" + tmdb_key)
            .then((detailsResponse) => {
                localStorage.setItem("chosenMovieDetails", detailsResponse.data)
                dispatch({type: "GET_CHOSEN_MOVIE_DETAILS", details: detailsResponse.data});
                axios
                    .get("http://www.omdbapi.com/?apikey=" + omdb_key + "&plot=full&i=" + detailsResponse.data.imdb_id)
                    .then((extraDetailsResponse) => {
                        localStorage.setItem("chosenMovieExtraDetails", extraDetailsResponse.data)
                        console.log("INFO", extraDetailsResponse.data);
                        dispatch({type: "GET_CHOSEN_MOVIE_EXTRA_DETAILS", extra_details: extraDetailsResponse.data});
                    });
            });
        axios
            .get("https://api.themoviedb.org/3/movie/" + getState().chosenMovie + "/credits?api_key=" + tmdb_key)
            .then((creditsResponse) => {
                localStorage.setItem("chosenMovieCast", creditsResponse.data.cast)
                dispatch({type: "GET_CHOSEN_MOVIE_CAST", cast: creditsResponse.data.cast});
            });
    }
}
export const setChosenActor = (id) => {
    return (dispatch, getState) => {
        localStorage.setItem("chosenActor", id);
        dispatch({type: "SET_CHOSEN_ACTOR", actor_id: id});
    }
}
export const getActorDetails = () => {
    return (dispatch, getState) => {
        axios
            .get("https://api.themoviedb.org/3/person/" + getState().chosenActorId + "?api_key=" + tmdb_key)
            .then((response1) => {
                localStorage.setItem("chosenActorDetails", response1.data);
                axios
                    .get("https://api.themoviedb.org/3/person/" + getState().chosenActorId + "/movie_credits?api_key=" + tmdb_key)
                    .then((response2) => {
                        localStorage.setItem("chosenActorMovies", response2.data.cast);
                        //dispatch({type: "GET_CHOSEN_ACTOR_DETAILS", actor_details: response1.data, actor_movies: response2.data.cast});
                        axios
                            .get("https://api.themoviedb.org/3/person/" + getState().chosenActorId + "/tv_credits?api_key=" + tmdb_key)
                            .then((response3) => {
                                localStorage.setItem("chosenActorTV", response3.data.cast);
                                dispatch({type: "GET_CHOSEN_ACTOR_DETAILS", actor_details: response1.data, actor_movies: response2.data.cast, tv_shows: response3.data.cast});
                            });
                    });
            });
    }
}
export const setSearchQuery = (e) => {
    return (dispatch, getState) => {
        dispatch({type: "SET_SEARCH_QUERY", query: e.target.value});
    }
}
export const getSearchQueryResults = () => {
    return (dispatch, getState) => {
        axios
            .get("https://api.themoviedb.org/3/search/movie?api_key=" + tmdb_key + "&query=" + encodeURI(getState().searchQuery))
            .then((response1) => {
                axios
                    .get("https://api.themoviedb.org/3/search/person?api_key=" + tmdb_key + "&query=" + encodeURI(getState().searchQuery))
                    .then((response2) => {
                        dispatch({type: "GET_QUERY_RESULTS", movies: response1.data.results, actors: response2.data.results});
                    })
            });
    }
}