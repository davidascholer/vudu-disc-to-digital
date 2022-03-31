import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

import AppBackgroundWScrollListener from '../components/AppBackgroundWScrollListener';
import MovieItem from '../components/MovieItem';
import Picker from '../components/Picker';
import SideNav from '../components/SideNav';
import SearchBar from '../components/SearchBar';
import FilterDialogue from '../components/FilterDialogue';
import UpcFooter from '../components/UpcFooter';

import AppContext from '../config/context';
import appColors from '../styles/appColors';
import cancelIcon from '../assets/images/cancel.png';

import getMovies from '../controller/getMovies';
import { CONSTANTS } from '../config/constants';
import LoadingIcon from '../assets/images/loading_64.gif';

export default function MainScreen() {

    //Routes.
    let navigate = useNavigate();

    //Static constants
    const EMPTY_MOVIE_MESSAGE = "no matches";

    const [userData, setUserData] = useState({});
    const [sortViewOpen, setSortViewOpen] = useState(false);
    const [moviePosition, setMoviePosition] = useState(0);
    const [movieList, setMovieList] = useState([]);
    const [emptyMovieMsg, setEmptyMovieMsg] = useState(EMPTY_MOVIE_MESSAGE);
    const [isSubscribed, setIsSubscribed] = useState(true);
    const [loading, setLoading] = useState(false);
    const [superUser, setSuperUser] = useState(true);

    //Filters
    const [genreFilter, setGenreFilter] = useState("");
    const [formatFilter, setFormatFilter] = useState("");
    const [ratingFilter, setRatingFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [searchBarFilter, setSearchBarFilter] = useState("");

    //Context
    const appContext = useContext(AppContext);

    //Local Ref Var
    const initialRender = useRef(true);

    useEffect(() => {
        if (!initialRender.current) {
            setMovies(appContext.globalMoviePosition);
        }
    }, [genreFilter, formatFilter, ratingFilter, yearFilter])

    //Get the user and set the user database priviledge. 
    //Then, grab the data from the db.
    useEffect(async () => {

        const user = await getUser();
        setUserData(user);
        //For the time being, grant access to everyone. Uncomment to reinstate limited access.
        const isSuper = true;
        // const isSuper = await getUser();
        if (isSuper) {
            setSuperUser(isSuper);
            setMovies(0, true);
        } else
            setMovies(0, false);

        //Let the dust settle.
        setTimeout(() => {
            initialRender.current = false;
        }, 2000);
    }, []);

    // const getUser = async () => {
    //     const user = await appContext.getUser();
    //     if (user) {
    //         setUserData(user);
    //         if (user.userStatus === "9")
    //             return true;
    //     } else {
    //         setUserData({});
    //     }
    //     return false;
    // }

    //Save the user object to the local storage and app context.
    const getUser = async () => {

        const user = await appContext.getUser();

        if (user)
            if (user.jwt)
                return user;
        return {};

    }

    useEffect(() => {
        setIsSubscribed(true);
        //   If the user goes 1.5 seconds without typing, query the input.
        const searchTimeout = setTimeout(() => {
            if (!initialRender.current) {
                setMovies(0);
            }
        }, 1500);

        return () => {
            clearTimeout(searchTimeout);
            setIsSubscribed(false);
        }
    }, [searchBarFilter]);

    const handleSortPressed = () => {
        setSortViewOpen(!sortViewOpen);
    }

    const hanldeFilterSelected = (filter, filterParent) => {
        const key = filterParent.toLowerCase();
        if (key === "genre")
            setGenreFilter(filter);
        if (key === "format")
            setFormatFilter(filter);
        if (key === "rating")
            setRatingFilter(filter);
        if (key === "year")
            setYearFilter(filter);
    }

    const handleFilterCancel = filter => {
        if (filter === "genre")
            setGenreFilter("");
        if (filter === "format")
            setFormatFilter("");
        if (filter === "rating")
            setRatingFilter("");
        if (filter === "year")
            setYearFilter("");
    }

    const handleMovieSelected = movie => {
        navigate('/movie', { state: { movie, user: userData } });
    }


    const handleSignOut = async () => {
        //Sign out on device. 
        const result = await appContext.signOut();
        if (result.success) {
            setUserData({});
            navigate("/");
        }
    }

    const scrollListener = async pos => {
        if (pos === "beg") {
            const loaded = await handleScrollBeg();
            return loaded;
        } else if (pos === "end") {
            const loaded = await handleScrollEnd();
            return loaded
        } else
            return false;
    }

    //Decrease the movie position if current position is greater than zero.
    //Also, set to zero if current position minus load value is less than zero.
    const handleScrollBeg = async () => {
        if (moviePosition !== 0) {
            let tempMoviePos = moviePosition - CONSTANTS.LOAD_VALUE;
            if (tempMoviePos < 0)
                tempMoviePos = 0;
            return await setMovies(tempMoviePos);
        } else
            return false;

    }

    //Increase the movie position if the current movies equals the max value
    const handleScrollEnd = async () => {
        if (movieList.length === CONSTANTS.LOAD_MAX) {
            const tempMoviePos = moviePosition + CONSTANTS.LOAD_VALUE;
            return await setMovies(tempMoviePos);
        } else
            return false;
    }

    const setMovies = async (movieIndex, sUser = superUser) => {
        setLoading(true);
        setMovieList([]);
        const movies = await getMovies(searchBarFilter, movieIndex, genreFilter, formatFilter, ratingFilter, yearFilter, sUser);
        setEmptyMovieMsg(EMPTY_MOVIE_MESSAGE);

        if (movies.error) {
            await setEmptyMovieMsg(movies.error + movies.error);
            setLoading(false);
            return false;
        }

        if (isSubscribed) {
            appContext.setGlobalMoviePosition(movieIndex);
            setMoviePosition(movieIndex);
            await setMovieList(movies);
            setLoading(false)
            return true;
        }
    }

    return (
        <AppBackgroundWScrollListener listener={scrollListener}>

            {/* Display the selected filters.*/}
            {(sortViewOpen || genreFilter + formatFilter + ratingFilter + yearFilter !== "") &&
                <div style={styles.selectedFilterContainer}>
                    <div style={styles.selectedFilter} onClick={() => handleFilterCancel("genre")}>
                        <span style={styles.selectedFilterText}>{genreFilter}</span>
                        {genreFilter !== "" && <img style={styles.selectedFilterCancel} src={cancelIcon} />}
                    </div>
                    <div style={styles.selectedFilter} onClick={() => handleFilterCancel("format")}>
                        <span style={styles.selectedFilterText}>{formatFilter}</span>
                        {formatFilter !== "" && <img style={styles.selectedFilterCancel} src={cancelIcon} />}
                    </div>
                    <div style={styles.selectedFilter} onClick={() => handleFilterCancel("rating")}>
                        <span style={styles.selectedFilterText}>{ratingFilter}</span>
                        {ratingFilter !== "" && <img style={styles.selectedFilterCancel} src={cancelIcon} />}
                    </div>
                    <div style={styles.selectedFilter} onClick={() => handleFilterCancel("year")}>
                        <span style={styles.selectedFilterText}>{yearFilter}</span>
                        {yearFilter !== "" && <img style={styles.selectedFilterCancel} src={cancelIcon} />}
                    </div>
                </div>
            }

            {/*Map all of the movies rectrieved from API.*/}
            <div style={styles.moviesContainer}>
                {/* {superUser &&
                    <h3 style={{ ...styles.text, ...{ fontSize: 14, marginLeft: 10, marginRight: 10, } }}>You are viewing the full database with over 10,000 titles. </h3>
                } */}
                {!superUser &&
                    <h3 style={{ ...styles.text, ...{ fontSize: 14, marginLeft: 10, marginRight: 10, } }}>There are over 3,000 titles in this database. Make ANY token purchase for access to over 10,000 titles. </h3>
                }
                <hr style={styles.hr}></hr>
                {movieList.length > 0 && movieList.map((movie, index) => (
                    <MovieItem
                        key={index}
                        movie={movie}
                        onPress={handleMovieSelected}
                    />

                ))}
                {movieList.length === 0 && loading &&
                    <div style={{ width: '100%', textAlign: 'center' }} >
                        <img src={LoadingIcon} alt="loading..." />
                    </div>
                }
                {movieList.length === 0 && !loading &&
                    <div style={{ width: '100%', textAlign: 'center' }} >
                        <span style={styles.text}>{emptyMovieMsg}</span>
                    </div>
                }
            </div>

            {/*Fixed top bar contents.*/}
            <div style={styles.fixedContainer}>
                <div style={styles.fixedSpacer} />
                <SearchBar styles={{
                    searchBarContainer: styles.searchBarContainer,
                    searchBarImage: styles.searchBarImage,
                    searchBarInput: styles.searchBarInput
                }}
                    onChange={setSearchBarFilter}
                />
                <Picker style={styles.searchOptionsContainer} openState={sortViewOpen} onClick={handleSortPressed}></Picker>
            </div>

            {/*Show the filter options if the filter button has been clicked.*/}
            {sortViewOpen &&
                <FilterDialogue style={styles.optionsDropDown} onPress={hanldeFilterSelected} />
            }

            {/*Footer.*/}
            <UpcFooter
                userTokens={userData.tokens} signedIn={userData.jwt ? true : false} />

            {/*Side bar navigation.*/}
            <SideNav
                style={styles.sideNav}
                signOut={handleSignOut}
                signedIn={userData.jwt ? true : false}
            />

        </AppBackgroundWScrollListener>
    );
}

//styles
const fixedSize = 70;
const filterContainerHeight = 50;
const styles = {
    fixedContainer: {
        backgroundColor: appColors.background,
        display: 'flex',
        flexWrap: 'nowrap',
        height: fixedSize,
        justifyContent: 'space-between',
        position: 'fixed',
        width: '98%'
    },
    fixedSpacer: {
        minWidth: fixedSize,
        maxWdth: fixedSize,
        width: fixedSize,
    },
    hr: {
        borderColor: '#aaa',
        display: 'block',
        opacity: '.5',
        width: '95%',
    },
    moviesContainer: {
        marginBottom: 50,
        marginTop: fixedSize + filterContainerHeight,
        width: 'inherit',
    },
    optionsDropDown: {
        backgroundColor: appColors.background,
        opacity: .95,
        overflow: 'hidden',
        position: 'fixed',
        marginTop: fixedSize + filterContainerHeight,
    },
    searchBarContainer: {
        alignItems: 'center',
        display: 'flex',
        flex: 5,
        minWidth: 0,
    },
    searchBarImage: {
        aspectRaitio: 1,
        maxWidth: 40,
        position: 'inherit',
        textAlign: 'center',
        width: '6vw',
    },
    searchBarInput: {
        backgroundColor: 'transparent',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottomColor: appColors.textHint,
        borderBottomStyle: 'solid',
        borderBottomWidth: 2,
        color: appColors.textHint,
        flex: 1,
        fontSize: 22,
        inset: 'none',
        margin: 10,
        minWidth: 0,
        outline: 'none',
        position: 'inherit',
        width: '100%',
    },
    searchOptionsContainer: {
        alignItems: 'center',
        backgroundColor: appColors.header,
        borderRadius: 10,
        display: 'flex',
        flex: 1,
        justifyContent: 'space-around',
        justifySelf: 'end',
        margin: 10,
        maxWidth: 100,
        minWidth: 80,

    },
    selectedFilter: {
        alignItems: 'center',
        color: '#fff',
    },
    selectedFilterContainer: {
        alignItems: 'center',
        backgroundColor: appColors.background,
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: fixedSize,
        minHeight: filterContainerHeight,
        opacity: .95,
        position: 'fixed',
        width: '100%',
    },
    selectedFilterCancel: {
        height: 14,
        marginLeft: 5,
        width: 14,
    },
    selectedFilterText: {
        height: 14,
        marginLeft: 5,
        pointerEvents: 'none',
        width: 14,
    },
    sideNav: {
        backgroundColor: 'rgba(0,0,0,.9)',
        height: '100vh',
        left: 0,
        overflow: 'hidden',
        paddingTop: fixedSize,
        position: 'fixed',
        top: 0,
        width: '0vw',
    },
    text: {
        textAlign: 'center',
        fontWeight: "500",
        fontSize: 20,
        color: '#fff'
    },
};