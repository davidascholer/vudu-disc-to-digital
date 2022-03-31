import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import upcImage from '../assets/images/qr_code.jpg';

import appColors from '../styles/appColors';

/*Must change state in parent to update*/
export default function UpcFooter({ userTokens, signedIn, style }) {

    let navigate = useNavigate();

    const mod = userTokens !== 1 ? "s" : "";

    return (
        <>
            {signedIn &&
                <div
                    style={{ ...styles.container, ...style }}
                    onClick={() => navigate("/buytokens")}
                >
                    <span style={styles.text}>{`You Have ${userTokens} Movie Token${mod} Remaining`}</span>
                    <img style={styles.image} src={upcImage}></img>
                </div>
            }
            {!signedIn &&
                <div
                    style={{ ...styles.container, ...style }}
                    onClick={() => navigate("/")}
                >
                    <span style={styles.text}>Sign in for a free token towards a movie!</span>
                    <img style={styles.image} src={upcImage}></img>
                </div>
            }
        </>
    );
}

const styles = {
    container: {
        alignItems: 'center',
        backgroundColor: appColors.background,
        boxShadow: `0 -1px 3px ${appColors.header}`,
        bottom: 0,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop:2,
        position: 'fixed',
        width: '100%'
    },
    image: {
        width: (window.innerWidth < 500) ? '50px' : '8vh',
    },
    text: {
        color: '#fff',
        fontSize: 14,
        flex: 1,
        pointerEvents: 'none',
        textAlign: 'center',
    },
};