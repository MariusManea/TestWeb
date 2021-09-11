import {useEffect, useState} from "react";
import Axios from 'axios';
import {makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import './MoviesPage.css';

const useStyles = makeStyles({
    MoviesRow : {
        maxHeight: 400,
    },
    SummaryCell: {
        minWidth: 400,
    },
    GenresCell: {
        minWidth: 150,
    },
    NameCell: {
        minWidth: 250,
    },
    ExternalsCell: {
        minWidth: 150,
    }
})

function MoviesPage(props) {
    const classes = useStyles();
    const [moviesList, setMoviesList] = useState(Array(0));

    useEffect(() => {
        Axios({
            method: "GET",
            url: "https://api.tvmaze.com/shows",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            const list = res.data;
            setMoviesList(list);
        }).catch(error => {
            if (error && error.response && (error.response.status === 401 || error.response.status === 403)) {
                throw error;
            }
        });
    },[])

    const getHeader = () => {
        return Object.keys(moviesList[0]).filter(key => key !== "url").map((key, i) => (
            <TableCell key={i}>{key}</TableCell>
        ))
    }

    const createRow = (movie, key) => {
        const date = new Date(movie.premiered);

        return (
            <TableRow key={key} style={(key % 2) ? { background : "#fdffe0" }:{ background : "white" }} className={classes.MoviesRow}>
                <TableCell>{movie.id}</TableCell>
                <TableCell className={classes.NameCell}>
                    <a href={movie.url}>{movie.name}</a>
                </TableCell>
                <TableCell>{movie.type}</TableCell>
                <TableCell>{movie.language}</TableCell>
                <TableCell className={classes.GenresCell}>
                    <div className={"CellList"}>
                        {movie.genres.map((genre, i) => (
                            <div key={i}>{genre}</div>
                        ))}
                    </div>
                </TableCell>
                <TableCell>{movie.status}</TableCell>
                <TableCell>{movie.runtime}</TableCell>
                <TableCell>{movie.averageRuntime}</TableCell>
                <TableCell>{date.toDateString()}</TableCell>
                <TableCell><a href={movie.officialSite}>{movie.officialSite}</a></TableCell>
                <TableCell>
                    <div className={"CellList"}>
                        {movie.schedule.days.map((day, i) => (
                            <div key={i}>{day}, {movie.schedule.time}</div>
                        ))}
                    </div>
                </TableCell>
                <TableCell>{movie.rating.average}</TableCell>
                <TableCell>{movie.weight}</TableCell>
                <TableCell>{movie.network === null ? '-' : <div>{movie.network.name}, {movie.network.country.name}</div>}</TableCell>
                <TableCell>{movie.webChannel === null ? '-' : <div>{movie.webChannel.name}, {movie.webChannel.country === null ? "" : movie.webChannel.country.name}</div>}</TableCell>
                <TableCell>{movie.dvdCountry === null ? '-' : <div>{movie.dvdCountry.name}</div>}</TableCell>
                <TableCell className={classes.ExternalsCell}>
                    <div className={"CellList"}>
                        <div>tvrage: {movie.externals.tvrage}</div>
                        <div>thetvdb: {movie.externals.thetvdb}</div>
                        <div>imdb: {movie.externals.imdb}</div>
                    </div>
                </TableCell>
                <TableCell><img src={movie.image.medium} alt={''}/> </TableCell>
                <TableCell className={classes.SummaryCell}><div dangerouslySetInnerHTML={{__html: movie.summary}}/></TableCell>
                <TableCell>{movie.updated}</TableCell>
                <TableCell>
                    <div className={"CellList"}>
                        <a href={movie._links.self.href}>Self</a>
                        <a href={movie._links.previousepisode.href}>Previous Episode</a>
                    </div>
                </TableCell>
            </TableRow>
        )
    }

    let componentShown = <div>Nu s-a gasit niciun film</div>

    if (moviesList && moviesList.length !== 0) {
        componentShown =
            <TableContainer className={"TableContainer"}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {getHeader()}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {moviesList.map((movie, i) => (
                            createRow(movie, i)
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    }

    return (
        <div className={"MoviesPageContainer"}>
            {componentShown}
        </div>
    )
}

export default MoviesPage;