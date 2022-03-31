import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import AppBackground from '../components/AppBackground';
import BackButton from '../components/common/BackButton';

export default function PurchaseSuccessful() {

    let navigate = useNavigate();

    const { state } = useLocation();
    const { receiptID, tokens } = state;

    return (
        <AppBackground style={styles.container}>
            <BackButton style={styles.backButton} />
            <div style={styles.innerContainer}>
                <h1 style={styles.text}>Purchase Complete</h1>
                <div style={styles.text}>The id for your transaction is: {receiptID}</div>
                <div style={styles.text}>You now have {tokens} tokens available.</div>
                <div style={styles.text}>If you have any questions or concerns, use our
                    <span style={{ ...styles.text, ...styles.link }} onClick={() => navigate('/contact', { replace: true })}> contact </span>
                    form and please include your transaction id which can also be found on your
                    <span style={{ ...styles.text, ...styles.link }} onClick={() => navigate('/receipts', { replace: true })}> receipts </span>
                    page.
                </div>
                <div style={{ ...styles.text, ...styles.link }} onClick={() => navigate('/home', { replace: true })}><span style={styles.noPointerEvents}>GO TO MOVIES</span></div>
                <div style={{ ...styles.text, ...styles.link }} onClick={() => navigate('/receipts', { replace: true })}><span style={styles.noPointerEvents}>GO TO RECEIPTS</span></div>
            </div>
        </AppBackground>
    );
}

const styles = {
    backButton: {
        height: 30,
        marginRight: 'auto',
        marginLeft: 10,
        width: '5vw',
    },
    innerContainer: {
        padding: 50,
    },
    link: {
        cursor: 'pointer',
        fontSize: 18,
        fontWeight: 700,
        marginTop: 25,
    },
    noPointerEvents: {
        pointerEvents: 'none'
    },
    text: {
        color: '#fff',
        marginTop: 15,
        textAlign: 'center',
    },
};