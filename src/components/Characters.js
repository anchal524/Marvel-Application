import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import SearchVal from "./Search";
import noImage from "../img/download.jpeg";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core";
import "../App.css";

const md5 = require("blueimp-md5");
const publickey = "20064086eb5dea5539cf2be4e9e8f743";
const privatekey = "e9846adc932f1d910526bd99de72d895d553d5ca";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";

const useStyles = makeStyles({
    card: {
        maxWidth: 250,
        height: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5,
        border: "1px solid #222",
        boxShadow:
            "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
        // margin: "auto",
    },
    titleHead: {
        borderBottom: "1px solid ",
        fontWeight: "bold",
        color: "#222",
    },
    grid: {
        flexGrow: 1,
        flexDirection: "row",
    },
    media: {
        height: "100%",
        width: "100%",
    },
    button: {
        color: "#222",
        fontWeight: "bold",
        fontSize: 12,
    },
});
const Characters = (props) => {
    const regex = /(<([^>]+)>)/gi;
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [characterData, setCharacterData] = useState(undefined);
    const [totalResults, setTotalResults] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState(undefined);
    let card = null;
    let {page} = useParams();
    const offset = page * 20;

    useEffect(() => {
        console.log("on load useeffect");
        console.log(offset);
        async function fetchData() {
            try {
                console.log("entered");
                page = parseInt(page);
                const url =
                    baseUrl +
                    "?ts=" +
                    ts +
                    "&apikey=" +
                    publickey +
                    "&hash=" +
                    hash +
                    "&offset=" +
                    offset +
                    "&limit=20";
                const {data} = await axios.get(url);
                console.log("url " + url);
                setTotalResults(data.data.total);
                console.log("total ", totalResults);
                console.log(page);
                setCharacterData(data.data.results);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [page]);

    useEffect(() => {
        console.log("search useEffect fired");
        async function fetchData() {
            try {
                console.log(`in fetch searchTerm: ${searchTerm}`);
                const url =
                    baseUrl +
                    "?ts=" +
                    ts +
                    "&apikey=" +
                    publickey +
                    "&hash=" +
                    hash +
                    "&nameStartsWith=" +
                    searchTerm;
                const {data} = await axios.get(url);
                setTotalResults(data.data.total);
                setSearchData(data.data.results);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        if (searchTerm) {
            console.log("searchTerm is set");
            fetchData();
        }
    }, [searchTerm]);

    const searchValue = async (value) => {
        setSearchTerm(value);
    };

    const buildCard = (character) => {
        return (
            <Grid item xs={10} sm={7} md={5} lg={4} xl={3} key={character.id}>
                <Card className={classes.card} variant='outlined'>
                    <CardActionArea>
                        <Link to={`/characters/${character.id}`}>
                            <CardMedia
                                className={classes.media}
                                component='img'
                                image={
                                    character.thumbnail &&
                                    character.thumbnail.path
                                        ? character.thumbnail.path +
                                          "/portrait_uncanny." +
                                          character.thumbnail.extension
                                        : noImage
                                }
                                title='character image'
                            />

                            <CardContent>
                                <Typography
                                    className={classes.titleHead}
                                    gutterBottom
                                    variant='h6'
                                    component='h2'
                                >
                                    {character.name}
                                </Typography>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    };
    if (searchTerm) {
        card =
            searchData &&
            searchData.map((characters) => {
                return buildCard(characters);
            });
    } else {
        card =
            characterData &&
            characterData.map((characters) => {
                return buildCard(characters);
            });
    }
    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else if (totalResults <= offset) {
        return (
            <p>
                <h1>Error 404: Page not found</h1>
            </p>
        );
    } else {
        return (
            <div>
                {/* <Grid container className={classes.grid} spacing={1}>
                    {characterData &&
                        characterData.map((character) => {
                            return buildCard(character);
                        })}
                </Grid> */}

                <div className='pages'>
                    {page && page === "0" ? (
                        <p></p>
                    ) : (
                        <a href={`/characters/page/${parseInt(page) - 1}`}>
                            <button className='button1'>Previous</button>
                        </a>
                    )}

                    {page && totalResults > offset + 20 && (
                        <a href={`/characters/page/${parseInt(page) + 1}`}>
                            <button className='button1'>Next</button>
                        </a>
                    )}
                </div>
                <div>
                    <br />
                    <br />
                    <SearchVal searchValue={searchValue} />
                    <br />
                    <br />
                    <Grid container className={classes.grid} spacing={1}>
                        {card}
                    </Grid>
                </div>
            </div>
        );
    }
};
export default Characters;
