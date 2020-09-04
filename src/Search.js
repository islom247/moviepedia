import React, {Component} from "react";
import {connect} from "react-redux";
import {getSearchQueryResults, setChosenMovie, setChosenActor} from "./store/movieActions"
import "./styles.css"
import {Link} from "react-router-dom";

class Search extends Component {
    componentDidMount() {
        this.props.getSearchQueryResults();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.searchQuery !== this.props.searchQuery) {
            this.props.getSearchQueryResults();
        }
    }

    render() {
        const {movies, actors, tvShows, searchQuery, setChosenMovie, setChosenActor} = this.props;
        return (
            <div className="Search">
                <h5 className="center white-text ">Search results for "{searchQuery}"</h5>
                <h3 className="center white-text ">Movies</h3>
                {
                    movies.length === 0 ? <p className="center teal-text">Loading...</p> :
                        <div className="trending">
                            {movies.map((item, i) => {
                                return <div className="card" key={i}>
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator"
                                             src={item.poster_path ? "https://image.tmdb.org/t/p/w185" + item.poster_path : require("./film-placeholder.png")}
                                             alt="poster"/>
                                    </div>
                                    <div className="card-content">
                                    <span className="activator grey-text text-darken-4"
                                          onClick={() => setChosenMovie(item.id)}>
                                        <Link to={"/movie/" + encodeURIComponent(item.title)}>{item.title}</Link>
                                        <i className="material-icons right">more_vert</i>
                                    </span>
                                    </div>
                                    <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4">{item.title}
                                        <i className="material-icons right">close</i>
                                    </span>
                                        <p>{item.overview}</p>
                                    </div>
                                </div>
                            })
                            }
                        </div>
                }
                <h3 className="center white-text ">TV Shows</h3>
                {
                    tvShows.length === 0 ? <p className="center teal-text">Loading...</p> :
                        <div className="trending">
                            {tvShows.map((item, i) => {
                                return <div className="card" key={i}>
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator"
                                             src={item.poster_path ? "https://image.tmdb.org/t/p/w185" + item.poster_path : require("./film-placeholder.png")}
                                             alt="poster"/>
                                    </div>
                                    <div className="card-content">
                                    <span className="activator grey-text text-darken-4"
                                          onClick={() => setChosenMovie(item.id)}>
                                        <Link to={"/movie/" + encodeURIComponent(item.name)}>{item.name}</Link>
                                        <i className="material-icons right">more_vert</i>
                                    </span>
                                    </div>
                                    <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4">{item.title}
                                        <i className="material-icons right">close</i>
                                    </span>
                                        <p>{item.overview}</p>
                                    </div>
                                </div>
                            })
                            }
                        </div>
                }
                <h3 className="center white-text ">Actors</h3>
                {
                    actors.length === 0 ? <p className="center teal-text">Loading...</p> :
                        <div className="trending">
                            {actors.map((item, i) => {
                                return <div className="card" key={i}>
                                    <div className="card-image">
                                        <img className="activator"
                                             src={item.profile_path ? "https://image.tmdb.org/t/p/w185" + item.profile_path : require("./film-placeholder.png")}
                                             alt="avatar"/>
                                    </div>
                                    <div className="card-content">
                                    <span className="activator grey-text text-darken-4"
                                          onClick={() => setChosenActor(item.id)}>
                                        <Link to={"/actor/" + encodeURIComponent(item.name)}>{item.name}</Link>
                                    </span>
                                    </div>
                                </div>
                            })
                            }
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.moviesForQuery,
        actors: state.actorsForQuery,
        tvShows: state.tvShowsForQuery,
        searchQuery: state.searchQuery,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getSearchQueryResults: () => dispatch(getSearchQueryResults()),
        setChosenMovie: (id) => dispatch(setChosenMovie(id)),
        setChosenActor: (id) => dispatch(setChosenActor(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);