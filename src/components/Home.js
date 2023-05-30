import React from "react";
import "../App.css";
import avengers from "../img/avengers.jpeg";

const Home = () => {
    return (
        <div>
            <h1>
                This is a Marvel website where you can view Marvel characters,
                comics, series and their info. Marvel Entertainment, LLC, a
                wholly-owned subsidiary of The Walt Disney Company, is one of
                the world's most prominent character-based entertainment
                companies, built on a proven library of more than 8,000
                characters featured in a variety of media over seventy-five
                years. Marvel utilizes its character franchises in
                entertainment, licensing and publishing.
            </h1>
            <br></br>
            <br></br>
            <br></br>
            <img src={avengers} className='avengers' alt='avengers' />
        </div>
    );
};

export default Home;
