import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import noImage from "../img/download.jpeg";
import {
    makeStyles,
    Card,
    Grid,
    CardContent,
    CardMedia,
    Typography,
    CardHeader,
} from "@material-ui/core";
import "../App.css";
const md5 = require("blueimp-md5");
const publickey = "20064086eb5dea5539cf2be4e9e8f743";
const privatekey = "e9846adc932f1d910526bd99de72d895d553d5ca";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const useStyles = makeStyles({
    card: {
        maxWidth: 550,
        height: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5,
        border: "1px solid #222",
        boxShadow:
            "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
        color: "#222",
    },
    titleHead: {
        borderBottom: "1px solid #222",
        fontWeight: "bold",
        color: "#222",
        fontSize: "large",
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

const CharDetails = (props) => {
    const [loading, setLoading] = useState(true);
    const classes = useStyles();
    const [charDetailsData, setCharacterDetailsData] = useState(undefined);
    let {id} = useParams();

    useEffect(() => {
        console.log("useEffect fired");
        async function fetchData() {
            try {
                const url =
                    `https://gateway.marvel.com:443/v1/public/characters/${id}` +
                    "?ts=" +
                    ts +
                    "&apikey=" +
                    publickey +
                    "&hash=" +
                    hash;
                const {data} = await axios.get(url);
                console.log(data);
                setCharacterDetailsData(data.data.results[0]);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [id]);

    const renderResourcelink = (renderType) => {
        return charDetailsData[renderType]["items"].map((data) => (
            <div>
                <li>
                    <a href={`/${renderType}/${data.resourceURI.slice(43)}`}>
                        {data.name}
                    </a>
                </li>
            </div>
        ));
    };
    const renderlink = (renderType) => {
        return charDetailsData[renderType]["items"].map((data) => (
            <div key={data.resourceURI}>
                <li>{data.name}</li>
            </div>
        ));
    };
    if (loading) {
        return (
            <div>
                {isNaN(charDetailsData) ? (
                    <p>
                        <h1>Error 404: Page not found</h1>
                    </p>
                ) : (
                    <div>
                        <h2>Loading....</h2>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <Grid
                item
                xs={20}
                sm={11}
                md={5}
                lg={5}
                xl={9}
                key={charDetailsData.id}
            >
                <Card className={classes.card} variant='outlined'>
                    {/* <CardHeader
                    className={classes.titleHead}
                    title={charDetailsData.name}
                /> */}
                    <CardMedia
                        className={classes.media}
                        component='img'
                        image={
                            charDetailsData.thumbnail &&
                            charDetailsData.thumbnail.path
                                ? charDetailsData.thumbnail.path +
                                  "/portrait_uncanny." +
                                  charDetailsData.thumbnail.extension
                                : noImage
                        }
                        title='character image'
                    />

                    <CardContent>
                        <Typography
                            variant='body2'
                            color='textSecondary'
                            component='span'
                        >
                            <p className='title1'>{charDetailsData.name}</p>
                            <dl>
                                <p>
                                    <dt className='title'>Description:</dt>
                                    {charDetailsData &&
                                    charDetailsData.description ? (
                                        <dd>{charDetailsData.description}</dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Comics Available:</dt>
                                    {charDetailsData &&
                                    charDetailsData.comics.available ? (
                                        <dd>
                                            {charDetailsData.comics.available}
                                        </dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Comics Name:</dt>
                                    {charDetailsData &&
                                    charDetailsData.comics.items ? (
                                        <dd>{renderResourcelink("comics")}</dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Series Available:</dt>
                                    {charDetailsData &&
                                    charDetailsData.series.available ? (
                                        <dd>
                                            {charDetailsData.series.available}
                                        </dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Series Name:</dt>
                                    {charDetailsData &&
                                    charDetailsData.series.items ? (
                                        renderResourcelink("series")
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>
                                        Stories Available:
                                    </dt>
                                    {charDetailsData &&
                                    charDetailsData.stories.available ? (
                                        <dd>
                                            {charDetailsData.stories.available}
                                        </dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Stories Name:</dt>

                                    {charDetailsData &&
                                    charDetailsData.stories.items ? (
                                        <dd>{renderlink("stories")}</dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                            </dl>
                            <a href={`/characters/page/0`}>
                                <button className='button1'>
                                    Back to all characters...
                                </button>
                            </a>
                            {/* <Link to='/characters/page/0'>
                            Back to all characters...
                        </Link> */}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
};

export default CharDetails;
