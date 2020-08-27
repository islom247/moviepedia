import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getHomepageMovies, setChosenMovie} from "./store/movieActions";
import "./styles.css";
import "./film-placeholder.png";

class Homepage extends Component {

    componentDidMount() {
        this.props.getHomepageMovies();
    }

    render() {
        console.log("rendering homepge");
        const {setChosenMovie, trending, upcoming} = this.props;
        return (
            <div className="Homepage">
                <h3 className="center white-text ">Trending now</h3>
                {
                    !trending ? <p className="center teal-text">Loading...</p> :
                        <div className="trending">
                            {trending.map((item, i) => {
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
                            })
                            }
                        </div>}
                <h3 className="center white-text">Upcoming</h3>
                {
                    !upcoming ? <p className="center teal-text">Loading...</p> :
                        <div className="trending">
                            {upcoming.map((item, i) => {
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
    console.log("redux state", state);
    return {
        trending: state.trending,
        upcoming: state.upcoming
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getHomepageMovies: () => dispatch(getHomepageMovies()),
        setChosenMovie: (id) => dispatch(setChosenMovie(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
