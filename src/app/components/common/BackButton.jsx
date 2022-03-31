import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import appColors from '../../styles/appColors';

export default function BackButton({ style }) {

    let navigate = useNavigate();

    return (
        <div style={{ ...styles.container, ...style }} onClick={() => navigate(-1, { replace: true })}>
            <div style={styles.button}>
                <div style={styles.arrow}></div>
            </div>
        </div>

    );
}

const styles = {
    arrow: {
        border: 'solid black',
        borderWidth: '0 3px 3px 0',
        display: 'inline-block',
        padding: 3,
        transform: 'rotate(135deg)',
    },
    container: {
        margin:20,
        width:20
    },
    button: {
        boxShadow: 'inset 0px 1px 0px 0px black',
        // background:'linear-gradient(to bottom, #63b8ee 5%, #468ccf 100%)',
        backgroundColor: appColors.header,
        borderRadius: 6,
        border: '1px solid black',
        display: 'inline-block',
        cursor: 'pointer',
        color: '#ccc',
        fontSize: 15,
        fontWeight: 'bold',
        padding: '15px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        textShadow: '0px 1px 1px black',
        width:'100%'

    },
};