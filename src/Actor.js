import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getActorDetails, setChosenMovie} from "./store/movieActions";

class Actor extends Component {
    componentDidMount() {
        this.props.getActorDetails();
    }

    render() {
        const {details, movies, tv_shows, setChosenMovie} = this.props;
        const birthday = details.birthday ?? "";
        const deathday = details.deathday ?? "";
        const mv = !movies ? <p>Loading...</p> :
            [...movies].map((item, i) => {
                return <div className="card" key={i}>
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator"
                             src={item.poster_path ? "http://image.tmdb.org/t/p/w185" + item.poster_path : require("./film-placeholder.png")}
                             alt="avatar"/>
                    </div>
                    <div className="card-content">
                                    <span className="activator grey-text text-darken-4"
                                          onClick={() => setChosenMovie(item.id)}>
                                        <Link to={"/movie/" + encodeURIComponent(item.title)}>{item.title}</Link>
                                    </span>
                        {item.character && item.character.length > 0 ? <div><p>as</p>
                            <span className="activator grey-text text-darken-4">
                                    {item.character}
                                    </span></div> : ""}
                    </div>
                    <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4">{item.title}
                                        <i className="material-icons right">close</i>
                                    </span>
                        <p>{item.overview}</p>
                    </div>
                </div>
            });
        const tv = !tv_shows ? <p>Loading...</p> :
            [...tv_shows].map((item, i) => {
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
                                    </span>
                        {item.character && item.character.length > 0 ? <div><p>as</p>
                            <span className="activator grey-text text-darken-4">
                                    {item.character}
                                    </span></div> : ""}
                    </div>
                    <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4">{item.title}
                                        <i className="material-icons right">close</i>
                                    </span>
                        <p>{item.overview}</p>
                    </div>
                </div>
            });
        return (
            <div>
                <div className="details">
                    <div className="movie-details">
                        <div className="card">
                            <div className="card-image">
                                <img className="activator"
                                     src={details.profile_path ? "https://image.tmdb.org/t/p/w185" + details.profile_path : require("./film-placeholder.png")}
                                     alt="avatar"/>
                            </div>
                            <div className="card-content">
                                <span className="card-title center teal-text">{details.name}</span>
                            </div>
                        </div>
                        <div className="extra-details">
                            <p><span className="yellow-text text-accent-1">Name:</span> {details.name}</p>
                            <p><span
                                className="yellow-text text-accent-1">Birthday:</span> {birthday.split("-").reverse().join(".")}
                            </p>
                            {deathday.length > 1 ? <p><span
                                className="yellow-text text-accent-1">Died:</span> {deathday.split("-").reverse().join(".")}
                            </p> : ""}
                            <p><span
                                className="yellow-text text-accent-1">Place of birth:</span> {details.place_of_birth}
                            </p>
                            <p><span className="yellow-text text-accent-1">Biography:</span> {details.biography}</p>
                        </div>
                    </div>
                    <h3 className="center white-text ">Movies</h3>
                    <div className="trending">
                        {mv}
                    </div>
                    <h3 className="center white-text ">TV</h3>
                    <div className="trending">
                        {tv}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        details: state.chosenActorDetails,
        movies: state.chosenActorMovies,
        tv_shows: state.chosenActorTV
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getActorDetails: () => dispatch(getActorDetails()),
        setChosenMovie: (id) => dispatch(setChosenMovie(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Actor);