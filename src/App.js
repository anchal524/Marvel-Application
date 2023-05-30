import React from "react";
import logo from "./img/marvel.png";
import "./App.css";
import Characters from "./components/Characters";
import CharDetails from "./components/CharacterDetails";
import Home from "./components/Home";
import Error from "./components/Error";
import Comics from "./components/Comics";
import ComicDetails from "./components/ComicDetails";
import Series from "./components/Series";
import SeriesDetails from "./components/SeriesDetails";
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";

const App = () => {
    return (
        <Router>
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <h1 className='App-title'>Welcome to the Marvel API.</h1>
                    <Link className='showlink' to='/'>
                        Home
                    </Link>
                    <Link className='showlink' to='/characters/page/0'>
                        Characters
                    </Link>
                    <Link className='showlink' to='/comics/page/0'>
                        Comics
                    </Link>
                    <Link className='showlink' to='/series/page/0'>
                        Series
                    </Link>
                </header>
                <br />
                <br />
                <div className='App-body'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route
                            path='/characters/page/:page'
                            element={<Characters />}
                        />
                        <Route
                            path='/characters/:id'
                            element={<CharDetails />}
                        />
                        <Route path='/comics/page/:page' element={<Comics />} />
                        <Route path='/comics/:id' element={<ComicDetails />} />
                        <Route path='/series/page/:page' element={<Series />} />
                        <Route path='/series/:id' element={<SeriesDetails />} />
                        <Route path='*' element={<Error />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
