import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import AppBackground from '../components/AppBackground';
import BackButton from '../components/common/BackButton';
import MovieItem from '../components/MovieItem';

import AppContext from '../config/context';

import getMoviesFromUPCs from '../controller/getMoviesFromUPCs';

export default function UserTokensScreen() {

    //Routes.
    let navigate = useNavigate();

    //Static constants
    const EMPTY_MOVIE_MESSAGE = "you haven't redeemed any tokens yet";

    const [movieList, setMovieList] = useState([]);
    const [emptyMovieMsg, setEmptyMovieMsg] = useState(EMPTY_MOVIE_MESSAGE);

    const appContext = useContext(AppContext);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const user = await appContext.getUser();
        if (user)
            setMovies(user.redemptions)
        else
            navigate('/');
    }

    const handleMovieSelected = movie => {
        navigate('/barcode', { state: { title: movie.title, upcData: movie.upc } });
    }

    const setMovies = async movieUPCs => {

        setEmptyMovieMsg("fetching movies");
        const movies = await getMoviesFromUPCs(movieUPCs);
        setEmptyMovieMsg(EMPTY_MOVIE_MESSAGE);

        if (movies.error)
            return setEmptyMovieMsg(movies.error);

        setMovieList(movies);
    }

    return (
        <AppBackground>
            <BackButton style={styles.backButton} />

            {/*Map all of the movies rectrieved from API.*/}
            <div style={styles.moviesContainer}>
                {movieList.length > 0 && movieList.map((movie, index) => (
                    <MovieItem
                        key={index}
                        movie={movie}
                        onPress={handleMovieSelected}
                    />
                ))}
                {movieList.length === 0 &&
                    <p style={{ textAlign: 'center', color: '#fff' }}>{emptyMovieMsg}</p>
                }
            </div>

        </AppBackground>
    );
}

//styles
const styles = {
    backButton:{
        position:'relative',
        marginRight:'auto',
        left:10,
        top:10,
    },
    moviesContainer: {
        width: 'inherit',
    },
};