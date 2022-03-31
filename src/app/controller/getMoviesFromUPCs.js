/*
Gets the movie data for the main screen. Called from the view, to the model.
*/
import getMoviesFromUPCsAsync from "../model/crud/getMoviesFromUPCsAsync";
import filterError from "./filterError";

import { CONSTANTS } from '../config/constants';

const getMoviesFromUPCs = async movieUPCs => {

    try {
        const movies = await getMoviesFromUPCsAsync(movieUPCs);

        if (!movies.ok)
            return filterError(movies.data);

        return movies.data;

    } catch (error) {
        console.log('error: ' + error);
    }
}

export default getMoviesFromUPCs;