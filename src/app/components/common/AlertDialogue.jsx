import React, { useState } from "react";

import Button from "./Button";

import appColors from "../../styles/appColors";

export default function AlertDialogue({ style, title = "", message = "", okText = "confirm", cancelText = "cancel", handleCancel, handleConfirm, hideCancelButton = false }) {

    return (
        <div style={{...styles.container, ...style}} onClick={() => handleCancel()}>
            <div style={styles.innerContainer}>
                <span style={{ ...styles.text, ...{ fontSize: 22, fontWeight: '600' } }}>{title}</span>
                <span style={styles.text}>{message}</span>
                <Button style={styles.button} buttonTextStyles={styles.text} onClick={() => handleConfirm()} title={okText} />
                {!hideCancelButton &&
                    <Button style={styles.button} buttonTextStyles={styles.text} title={cancelText} />
                }
            </div>
        </div>
    );
}

const styles = {
    button: {
    },
    container: {
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,.8)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: "space-around",
        position: 'absolute',
        width: '100%',
        zIndex: 1
    },
    innerContainer: {
        alignItems: 'center',
        backgroundColor: appColors.background,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        margin:20,
        minHeight: '30%',
        justifyContent: 'space-evenly',
        padding: 30,
        minWidth: '30%',
    },
    text: {
        color: appColors.text,
        textAlign:'center',
    }
};
