/*
Gets the movie data for the main screen. Called from the view, to the model.
*/
import getMoviesFromApiAsync from "../model/crud/getMoviesFromApiAsync";
import filterError from "./filterError";

import { CONSTANTS } from '../config/constants';

const getMovies = async (searchString, index, genre, format, rating, year,expanded) => {

    const indexCount = CONSTANTS.LOAD_MAX;

    try {
        const movies = await getMoviesFromApiAsync(searchString, index, indexCount, genre, format, rating, year, expanded);

        if (!movies.ok)
            return filterError(movies.data);

        return movies.data;

    } catch (error) {
        console.log('error: ' + error);
    }
}

export default getMovies;