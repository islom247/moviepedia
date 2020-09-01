import React, {Component} from "react";
import {connect} from "react-redux";
import {getChosenMovieDetails, setChosenGenre, setChosenActor} from "./store/movieActions";
import {Link} from "react-router-dom";

class MovieDetails extends Component {
    componentDidMount() {
        this.props.getChosenMovieDetails();
    }

    render() {
        const {details, cast, images, extra_details, setChosenGenre, setChosenActor} = this.props;
        console.log("DETAILS: ", this.props);
        const genres = details.genres ?? [];
        const release_date = details.release_date ?? "";
        const plot = extra_details.Plot ?? "";
        console.log("genres: ", extra_details);
        return (
            <div className="details">
                <div className="movie-details">
                    <div className="card">
                        <div className="card-image">
                            <img className="activator"
                                 src={details.poster_path ? "http://image.tmdb.org/t/p/w185" + details.poster_path : require("./film-placeholder.png")}/>
                        </div>
                        <div className="card-content">
                            <span className="card-title center teal-text">{details.title}</span>
                        </div>
                    </div>
                    <div className="extra-details">
                        <p><span
                            className="yellow-text text-accent-1">Plot:</span> {extra_details.Plot === "N/A" ? details.overview : plot}
                        </p>
                        <p><span className="yellow-text text-accent-1">Director:</span> {extra_details.Director}</p>
                        <p><span className="yellow-text text-accent-1">Writer:</span> {extra_details.Writer}</p>
                        <p><span className="yellow-text text-accent-1">Production:</span> {extra_details.Production}</p>
                        <p><span className="yellow-text text-accent-1">Release date:</span> {extra_details.Released}</p>
                        <p><span className="yellow-text text-accent-1">Runtime:</span> {extra_details.Runtime}</p>
                        <p><span className="yellow-text text-accent-1">Tagline:</span> "{details.tagline}"</p>
                        <p><span className="yellow-text text-accent-1">IMDB Rating:</span> {extra_details.imdbRating}
                        </p>
                        <p><span className="yellow-text text-accent-1">Box office:</span> {extra_details.BoxOffice}</p>
                        <p><span className="yellow-text text-accent-1">Genres:</span>
                            {genres.map((item => {
                                return <Link className="movie-genres btn" key={item.id}
                                             to={{pathname: "/genres/" + item.name, genre: item}}
                                             style={{color: '#FFF'}} onClick={() => setChosenGenre(item.id, item.name)}>
                                    {item.name}
                                </Link>
                            }))}
                        </p>
                    </div>
                </div>
                <h3 className="center white-text ">Cast</h3>
                <div className="cast">
                    {cast.map((item, i) => {
                        return <div className="card" key={i}>
                            <div className="card-image">
                                <img className="activator"
                                     src={item.profile_path ? "http://image.tmdb.org/t/p/w185" + item.profile_path : require("./film-placeholder.png")}/>
                            </div>
                            <div className="card-content">
                                    <span className="activator grey-text text-darken-4"
                                          onClick={() => setChosenActor(item.id)}>
                                        <Link to={"/actor/" + encodeURIComponent(item.name)}>{item.name}</Link>
                                    </span>
                                {item.character && item.character.length > 0 ? <div><p>as</p>
                                    <span className="activator grey-text text-darken-4">
                                    {item.character}
                                    </span></div> : ""}
                            </div>
                        </div>
                    })}
                </div>
                {/*<div className="cast">*/}
                {/*    {images.map((item, i) => {*/}
                {/*        return <div className="card" key={i}>*/}
                {/*            <div className="card-image">*/}
                {/*                <img className="activator"*/}
                {/*                     src={item.file_path ? "http://image.tmdb.org/t/p/w185" + item.file_path : require("./film-placeholder.png")}/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    })}*/}
                {/*</div>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        details: state.chosenMovieDetails,
        extra_details: state.chosenMovieExtraDetails,
        cast: state.chosenMovieCast,
        images: state.chosenMovieImages
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getChosenMovieDetails: () => dispatch(getChosenMovieDetails()),
        setChosenGenre: (id, name) => dispatch(setChosenGenre(id, name)),
        setChosenActor: (id) => dispatch(setChosenActor(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);