import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import AppBackground from '../components/AppBackground';
import UpcFooter from '../components/UpcFooter';
import BackButton from '../components/common/BackButton';
import Button from '../components/common/Button';
import AlertDialogue from '../components/common/AlertDialogue';

import redeemToken from '../controller/redeemToken';
import AppContext from '../config/context';

export default function MovieScreen() {

    let navigate = useNavigate();
    const appContext = useContext(AppContext);

    const { state } = useLocation();
    const { movie } = state;
    const [alreadyRedeemed, setAlreadyRedeemed] = useState(false);
    const { format, genres, image, ratings, title, year } = movie;

    const [userData, setUserData] = useState({});
    const [signedIn, setSignedIn] = useState(false);
    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        const user = await appContext.getUser();
        setUserData(user);

        if (user)
            if (user.jwt) {
                setSignedIn(true);
                if (user.redemptions.includes(movie.upc))
                    setAlreadyRedeemed(true);
            }
    }

    const handleCancel = () => {
        setAlertShown(false);
    }

    //Calls the API to save the movie's id, subtract a token, and return the updated user.
    const handleConfirm = async () => {

        //Fail safe. User shouldn't be able to click if < 1.
        //The server will ultimately verify how many tokens remain.
        if (userData.tokens < 1)
            return;

        const updatedContent = await redeemToken(userData.appID, movie.upc);

        if (updatedContent.error)
            return;

        setUserData({ ...userData, ...updatedContent.data });
        appContext.setUser({ ...userData, ...updatedContent.data });

        navigate('/barcode', { state: { title: title, upcData: movie.upc } });
    }

    const handleRedeemClicked = () => {

        setAlertShown(true);

    }

    return (
        <AppBackground>
            {alertShown &&
                <AlertDialogue
                    title={"Confirm Use Token"}
                    message={"You're about to use a token. Continue?"}
                    okText={"yes, please!"}
                    cancelText={"no thanks"}
                    handleConfirm={handleConfirm}
                    handleCancel={handleCancel} />
            }
            <BackButton style={styles.backButton} />
            <div style={styles.container}>
                <h1 style={{ ...styles.text, ...styles.titleContainer }}>{title}</h1>
                <img style={styles.image} src={image} alt={title} />
                <h2 style={styles.text}>{year}</h2>
                <h2 style={styles.text}>{ratings}</h2>
                <h2 style={styles.text}>{format}</h2>
                <h2 style={styles.text}>{genres}</h2>
                {alreadyRedeemed &&
                <Button style={styles.button} buttonTextStyles={{fontSize:14}}title="You Already Have This Title" disabled={true} />
                }
                {!alreadyRedeemed &&
                <Button style={styles.button} title="Use Token" onClick={() => handleRedeemClicked()} disabled={!(signedIn && userData.tokens > 0)} />
                }
            </div>
            <UpcFooter
                userTokens={signedIn ? userData.tokens : null} signedIn={signedIn} />

        </AppBackground>
    );
}

const backButtonHeight = 30;
const styles = {
    backButton:{
        position:'absolute',
        left:10,
        top:10,
    },
    button: {
        maxWidth: 500,
        width: '60%',
    },
    container: {
        alignItems: 'center',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-evenly',
        marginBottom: '60px',
        marginTop: backButtonHeight + 5,
        maxHeight: 800,
        width: '100%',
    },
    image: {
        height: '45vw',
        marginLeft: 10,
        maxHeight: 300,
        objectFit: 'contain',
    },
    text: {
        color: '#fff',
        fontSize: (window.innerWidth < 600) ? '4vw' : '20px',
        fontWeight: 300,
        textAlign: "center",
    },
    titleContainer: {
        fontSize: (window.innerWidth < 600) ? '6vw' : '28px',
        fontWeight: 500,
    },
};
