import React, {useEffect, useContext} from "react";
import {Link, withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {setChosenGenre, setChosenYear, setSearchQuery} from "./store/movieActions";
import M from "materialize-css";

const Navbar = (props) => {
    const {genres, years, setChosenYear, setChosenGenre, setSearchQuery, searchQuery = ""} = props;
    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {inDuration: 300, outDuration: 225, size: 155});
    }, []);
    const redirectToSearchPage = (e) => {
        e.preventDefault();
        props.history.push("/searchResults/" + encodeURIComponent(searchQuery));
    }
    return (
        <div className="navbar-fixed">
            <ul id="genres" className="dropdown-content">
                {genres.map((item => {
                    return <li key={item.id} onClick={() => setChosenGenre(item.id, item.name)}>
                        <Link to={{pathname: "/genres/" + item.name, genre: item}}>
                            {item.name}
                        </Link>
                    </li>
                }))}
            </ul>
            <ul id="years" className="dropdown-content">
                {years.map((item => {
                    return <li key={item} onClick={() => setChosenYear(item)}>
                        <Link to={{pathname: "/year/" + item}}>
                            {item}
                        </Link>
                    </li>
                }))}
            </ul>
            <nav className="red darken-4">
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo">Moviepedia</a>
                    <ul className="right explore-links">
                        <li>
                            <a className="dropdown-trigger" href="#!" data-target="genres">
                                Genres
                                <i className="material-icons right">arrow_drop_down</i>
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-trigger" href="#!" data-target="years">
                                Year
                                <i className="material-icons right">arrow_drop_down</i>
                            </a>
                        </li>
                        <li>
                            <form onSubmit={redirectToSearchPage}>
                                <div className="input-field white-text">
                                    <i className="white-text material-icons prefix right">search</i>
                                    <input type="text"
                                           placeholder="search"
                                           id="autocomplete-input"
                                           className="autocomplete white-text"
                                           onChange={setSearchQuery}
                                           required
                                    />
                                </div>
                            </form>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        years: state.years,
        searchQuery: state.searchQuery
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setChosenGenre: (id, name) => dispatch(setChosenGenre(id, name)),
        setChosenYear: (year) => dispatch(setChosenYear(year)),
        setSearchQuery: (query) => dispatch(setSearchQuery(query))
    }
}
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Navbar);