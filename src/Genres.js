import React, {Component} from "react";
import M from "materialize-css";
import {connect} from "react-redux";
import "./styles.css"
import {Link} from "react-router-dom";
import {getMoviesWithGenre, setChosenYearForGenre, setChosenMovie} from "./store/movieActions";

class Genres extends Component {
    componentDidMount() {
        this.props.getMoviesWithGenre();
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {inDuration: 300, outDuration: 225, size: 155});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.chosenGenreName !== this.props.chosenGenreName || prevProps.yearForGenre !== this.props.yearForGenre) {
            this.props.getMoviesWithGenre();
        }
    }

    render() {
        const {movies1 = [], movies2 = [], setChosenMovie, chosenGenreName, years, setChosenYearForGenre, yearForGenre} = this.props;
        return (
            <div className="Genres center">
                <h3 className="center white-text ">{chosenGenreName}</h3>
                <p className="center white-text">Filter by year:</p>
                <ul id='genre-years' className='dropdown-content center'>
                    {years.map((item, i) => {
                        return <li style={{color: "teal"}} key={i}
                                   onClick={() => setChosenYearForGenre(item)}>{item}</li>
                    })}
                </ul>
                <a className="btn dropdown-trigger" href="#!" data-target="genre-years">
                    {yearForGenre}
                    <i className="material-icons right">arrow_drop_down</i>
                </a>
                {movies1.length === 0 ? <p className="center teal-text">Loading...</p>
                    :
                    <div className="trending">
                        {movies1.map((item, i) => {
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
                        })}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movies1: state.moviesWithGenre1,
        movies2: state.moviesWithGenre2,
        chosenGenreName: state.chosenGenreName,
        years: state.years,
        yearForGenre: state.yearForGenre
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMoviesWithGenre: () => dispatch(getMoviesWithGenre()),
        setChosenYearForGenre: (year) => dispatch(setChosenYearForGenre(year)),
        setChosenMovie: (id) => dispatch(setChosenMovie(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Genres);