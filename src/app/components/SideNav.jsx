import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import AlertDialogue from './common/AlertDialogue';
import NavMenu from './NavMenu';

import '../assets/animation/side_nav_anim.css';
import appColors from '../styles/appColors';

export default function SideNav({ style, shown, signedIn, signOut }) {

    let navigate = useNavigate();

    const [alertShown, setAlertShown] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [menuShown, setMenuShown] = useState(false);
    const [initialRender, setInitialRender] = useState(true);

    const handleAlertClicked = msg => {
        setAlertShown(true);
        setAlertMessage(msg);
    }

    const handleCancel = () => {
        setAlertShown(false);
        setAlertMessage("");
    }

    const handleConfirm = () => {
        navigate('/');
    }

    return (
        <>
            {!initialRender &&
                <>
                    {alertShown &&
                        <AlertDialogue
                            title={"Login or Sign Up"}
                            message={alertMessage}
                            okText={"go to login"}
                            handleConfirm={handleConfirm}
                            handleCancel={handleCancel} />
                    }

                    <div style={{ ...styles.container, ...style }} className={menuShown ? 'side-nav-open' : 'side-nav-close'}>
                        {signedIn &&
                            <>
                                <div style={styles.textContainer} onClick={() => navigate("/usertokens")}><span style={styles.text}>My Movies</span></div>
                                <div style={styles.textContainer} onClick={() => navigate("/buytokens")}><span style={styles.text}>Buy Tokens</span></div>
                                <div style={styles.textContainer} onClick={() => navigate("/receipts")}><span style={styles.text}>My Orders</span></div>
                                <div style={styles.textContainer} onClick={() => navigate("/howitworks")}><span style={styles.text}>How It Works</span></div>
                                <div style={styles.textContainer} onClick={() => signOut()}><span style={styles.text}>Sign Out</span></div>
                            </>
                        }
                        {!signedIn &&
                            <>
                                <div style={styles.textContainer} onClick={() => handleAlertClicked("Login or sign up to view your movies.")}><span style={styles.text}>My Movies</span></div>
                                <div style={styles.textContainer} onClick={() => navigate("/howitworks")}><span style={styles.text}>How It Works</span></div>
                                <div style={styles.textContainer} onClick={() => navigate("/")}><span style={styles.text}>Sign In</span></div>
                            </>
                        }
                        <div style={styles.textTermsContainer}>
                            <div onClick={() => navigate("/policies")}>
                                <span style={{ ...styles.text, ...styles.textTerms }}>Privacy & Terms</span>
                            </div>
                            <div onClick={() => navigate("/contact")}>
                                <span style={{ ...styles.text, ...styles.textTerms }}>Contact</span>
                            </div>
                        </div>
                    </div>
                </>
            }

            <NavMenu
                styles={{ container: styles.menuBarContainer, menuBar: styles.menuBar }}
                onClick={() => setMenuShown(!menuShown)}
                initialRender={initialRender}
                setInitialRender={setInitialRender}
                shown={menuShown} />
        </>
    );
}

const styles = {
    container: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    menuBar: {
        borderBottomColor: appColors.header,
        borderBottomStyle: 'solid',
        borderBottomWidth: 3,
        borderRadius: 10,
        left: '10%',
        position: 'absolute',
        width: '80%',
    },
    menuBarContainer: {
        cursor:'pointer',
        height: 50,
        margin: 10,
        overflow: 'hidden',
        position: 'fixed',
        left: 0,
        top: 0,
        width: 50,
    },
    text: {
        color: appColors.header,
        fontSize: 20,
        fontWeight: '500',
        pointerEvents: 'none',
    },
    textTerms: {
        fontSize: 13,
    },
    textTermsContainer: {
        cursor: 'pointer',
        marginTop: 'auto',
        marginBottom: 90,
        textAlign: 'center',
    },
    textContainer: {
        cursor: 'pointer',
        marginTop: 20,
    },
};