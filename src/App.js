import React, {Component} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Genres from "./Genres";
import Year from "./Year";
import Search from "./Search";
import MovieDetails from "./MovieDetails";
import Actor from "./Actor";
import axios from "axios";

class App extends Component {
    state = {
        genres: []
    }

    componentDidMount() {
        const tmdb_key = "5f9c5349c024cdd3b37a5f0f7a76e804";
        axios
            .get("https://api.themoviedb.org/3/genre/movie/list?api_key=" + tmdb_key + "&language=en-US")
            .then((response) => {
                this.setState({...this.state, genres: response.data.genres});
            });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar genres={this.state.genres}/>
                    <Switch>
                        <Route exact path="/" component={() => (
                            <Homepage/>)}/>
                        <Route path="/genres/:id" component={() => (
                            <Genres/>)}/>
                        <Route path="/actor/:id" component={() => (
                            <Actor/>)}/>
                        <Route path="/year/:id" component={() => (
                            <Year/>)}/>
                        <Route path="/searchResults/:query" component={() => (
                            <Search/>)}/>
                        <Route path="/movie/:id" component={() => (
                            <MovieDetails/>)}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;