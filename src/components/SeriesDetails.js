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

const SeriesDetails = (props) => {
    const [loading, setLoading] = useState(true);
    const classes = useStyles();
    const [seriesDetailsData, setSeriesDetailsData] = useState(undefined);
    let {id} = useParams();

    useEffect(() => {
        console.log("useEffect fired");
        async function fetchData() {
            try {
                const url =
                    `https://gateway.marvel.com:443/v1/public/series/${id}` +
                    "?ts=" +
                    ts +
                    "&apikey=" +
                    publickey +
                    "&hash=" +
                    hash;
                const {data} = await axios.get(url);
                console.log(data);
                setSeriesDetailsData(data.data.results[0]);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [id]);

    const renderlink = (renderType) => {
        return seriesDetailsData[renderType].items.map((data) => (
            <div key={data.resourceURI}>
                <li>{data.name}</li>
            </div>
        ));
    };
    const renderResourcelink = (renderType, index) => {
        return seriesDetailsData[renderType]["items"].map((data) => (
            <li>
                <a href={`/${renderType}/${data.resourceURI.slice(index)}`}>
                    {data.name}
                </a>
            </li>
        ));
    };
    if (loading) {
        return (
            <div>
                {isNaN(seriesDetailsData) ? (
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
                key={seriesDetailsData.id}
            >
                <Card className={classes.card} variant='outlined'>
                    {/* <CardHeader
                        className={classes.titleHead}
                        title={seriesDetailsData.title}
                    /> */}
                    <CardMedia
                        className={classes.media}
                        component='img'
                        image={
                            seriesDetailsData.thumbnail &&
                            seriesDetailsData.thumbnail.path
                                ? seriesDetailsData.thumbnail.path +
                                  "/portrait_uncanny." +
                                  seriesDetailsData.thumbnail.extension
                                : noImage
                        }
                        title='series image'
                    />
                    <p className='title1'>{seriesDetailsData.title}</p>
                    <CardContent>
                        <Typography
                            variant='body2'
                            color='textSecondary'
                            component='span'
                        >
                            <dl>
                                <p>
                                    <dt className='title'>Description:</dt>
                                    {seriesDetailsData &&
                                    seriesDetailsData.description ? (
                                        <dd>{seriesDetailsData.description}</dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Creators</dt>
                                    {seriesDetailsData &&
                                    seriesDetailsData.creators.items ? (
                                        <dd>{renderlink("creators")}</dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Comics Available:</dt>
                                    {seriesDetailsData &&
                                    seriesDetailsData.comics.available ? (
                                        <dd>
                                            {seriesDetailsData.comics.available}
                                        </dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Comics Name:</dt>
                                    {seriesDetailsData &&
                                    seriesDetailsData.comics.available ? (
                                        <dd>
                                            {renderResourcelink("comics", 43)}
                                        </dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>
                                        Stories Available:
                                    </dt>
                                    {seriesDetailsData &&
                                    seriesDetailsData.stories.available ? (
                                        <dd>
                                            {
                                                seriesDetailsData.stories
                                                    .available
                                            }
                                        </dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Stories Name:</dt>
                                    {seriesDetailsData &&
                                    seriesDetailsData.stories.items ? (
                                        <dd>{renderlink("stories")}</dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>
                                        Characters Available:
                                    </dt>
                                    {seriesDetailsData &&
                                    seriesDetailsData.characters.available ? (
                                        <dd>
                                            {
                                                seriesDetailsData.characters
                                                    .available
                                            }
                                        </dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                                <p>
                                    <dt className='title'>Characters</dt>
                                    {seriesDetailsData &&
                                    seriesDetailsData.characters.available ? (
                                        <dd>
                                            {renderResourcelink(
                                                "characters",
                                                47
                                            )}
                                        </dd>
                                    ) : (
                                        <dd>N/A</dd>
                                    )}
                                </p>
                            </dl>
                            <a href={`/series/page/0`}>
                                <button className='button1'>
                                    Back to all series...
                                </button>
                            </a>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
};

export default SeriesDetails;
