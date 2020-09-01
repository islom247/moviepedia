import React, {Component} from "react";
import {connect} from "react-redux";
import {getMoviesForYear, setChosenMovie} from "./store/movieActions";
import M from "materialize-css";
import "./styles.css";
import {Link} from "react-router-dom";

class Year extends Component {
    componentDidMount() {
        this.props.getMoviesForYear();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.chosenYear !== this.props.chosenYear) {
            this.props.getMoviesForYear();
        }
    }

    render() {
        const {setChosenMovie, movies1, movies2, chosenYear} = this.props;
        return (
            <div className="Year center">
                <h3 className="center white-text ">Movies released in {chosenYear}</h3>
                {movies1.length === 0 ? <p className="center teal-text">Loading...</p>
                    :
                    <div className="trending">
                        {movies1.map((item, i) => {
                            return <div className="card" key={i}>
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img className="activator"
                                         src={item.poster_path ? "http://image.tmdb.org/t/p/w185" + item.poster_path : require("./film-placeholder.png")}/>
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
                        })}
                    </div>
                }
                {movies2.length === 0 ? <p className="center teal-text">Loading...</p>
                    :
                    <div className="trending">
                        {movies2.map((item, i) => {
                            return <div className="card" key={i}>
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img className="activator"
                                         src={item.poster_path ? "http://image.tmdb.org/t/p/w185" + item.poster_path : require("./film-placeholder.png")}/>
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
                        })}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movies1: state.moviesForYear1,
        movies2: state.moviesForYear2,
        chosenYear: state.chosenYear
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMoviesForYear: () => dispatch(getMoviesForYear()),
        setChosenMovie: (id) => dispatch(setChosenMovie(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Year);