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
    },
    titleHead: {
        borderBottom: "1px solid #222",
        fontWeight: "bold",
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

const ComicDetails = (props) => {
    const [loading, setLoading] = useState(true);
    const classes = useStyles();
    const [comicsDetailsData, setComicsDetailsData] = useState(undefined);
    let {id} = useParams();

    useEffect(() => {
        console.log("useEffect fired");
        async function fetchData() {
            try {
                const url =
                    `https://gateway.marvel.com:443/v1/public/comics/${id}` +
                    "?ts=" +
                    ts +
                    "&apikey=" +
                    publickey +
                    "&hash=" +
                    hash;
                const {data} = await axios.get(url);
                console.log(data);
                setComicsDetailsData(data.data.results[0]);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [id]);

    const renderlink = (renderType) => {
        return comicsDetailsData[renderType].items.map((data) => (
            <div key={data.resourceURI}>
                <li>{data.name}</li>
            </div>
        ));
    };
    const renderResourcelink = (renderType) => {
        return comicsDetailsData[renderType]["items"].map((data) => (
            <li>
                <a href={`/${renderType}/${data.resourceURI.slice(47)}`}>
                    {data.name}
                </a>
            </li>
        ));
    };
    if (loading) {
        return (
            <div>
                {isNaN(comicsDetailsData) ? (
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
                key={comicsDetailsData.id}
            >
                <Card className={classes.card} variant='outlined'>
                    {/* <CardHeader
                        className={classes.titleHead}
                        title={comicsDetailsData.title}
                    /> */}
                    <CardMedia
                        className={classes.media}
                        component='img'
                        image={
                            comicsDetailsData.thumbnail &&
                            comicsDetailsData.thumbnail.path
                                ? comicsDetailsData.thumbnail.path +
                                  "/portrait_uncanny." +
                                  comicsDetailsData.thumbnail.extension
                                : noImage
                        }
                        title='comic image'
                    />

                    <CardContent>
                        <Typography
                            variant='body2'
                            color='textSecondary'
                            component='span'
                        >
                            <dl>
                                <p className='title1'>
                                    {comicsDetailsData.title}
                                </p>
                                <p>
                                    <dt className='title'>Description:</dt>
                                    {comicsDetailsData &&
                                    comicsDetailsData.description ? (
                                        <dd>{comicsDetailsData.description}</dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Creators</dt>
                                    {comicsDetailsData &&
                                    comicsDetailsData.creators.items ? (
                                        <dd>{renderlink("creators")}</dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Series:</dt>
                                    {comicsDetailsData &&
                                    comicsDetailsData.series ? (
                                        <dd>{comicsDetailsData.series.name}</dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>
                                        Stories Available:
                                    </dt>
                                    {comicsDetailsData &&
                                    comicsDetailsData.stories.available ? (
                                        <dd>
                                            {
                                                comicsDetailsData.stories
                                                    .available
                                            }
                                        </dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Stories Name:</dt>
                                    {comicsDetailsData &&
                                    comicsDetailsData.stories.available ? (
                                        <dd>{renderlink("stories")}</dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>
                                        Characters Available:
                                    </dt>
                                    {comicsDetailsData &&
                                    comicsDetailsData.characters.available ? (
                                        <dd>
                                            {
                                                comicsDetailsData.characters
                                                    .available
                                            }
                                        </dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Characters:</dt>
                                    {comicsDetailsData &&
                                    comicsDetailsData.characters.available ? (
                                        <dd>
                                            {renderResourcelink("characters")}
                                        </dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>
                                        Stories Available:
                                    </dt>
                                    {comicsDetailsData &&
                                    comicsDetailsData.stories.available ? (
                                        <dd>
                                            {
                                                comicsDetailsData.stories
                                                    .available
                                            }
                                        </dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Stories:</dt>
                                    {comicsDetailsData &&
                                    comicsDetailsData.stories.available ? (
                                        <dd>{renderlink("stories")}</dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                            </dl>
                            <a href={`/comics/page/0`}>
                                <button className='button1'>
                                    Back to all comics...
                                </button>
                            </a>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
};

export default ComicDetails;
