import React from 'react';
import appColors from '../styles/appColors';

import AppleMediaLogin from './media/AppleMediaLogin';
import FacebookMediaLogin from './media/FacebookMediaLogin';
import GoogleMediaLogin from './media/GoogleMediaLogin';

export default function MediaLogin({ responseApple, responseFacebook, responseGoogle, style }) {

    return (
        <div style={{ ...styles.container, ...style.container }}>
            <FacebookMediaLogin responseFacebook={responseFacebook} style={{container:styles.buttonContainer,image:styles.buttonImage,text:styles.buttonText}}/>
            <GoogleMediaLogin responseGoogle={responseGoogle} style={{container:styles.buttonContainer,image:styles.buttonImage,text:styles.buttonText}}/>
            <AppleMediaLogin responseApple={responseApple} style={{container:styles.buttonContainer,image:styles.buttonImage,text:styles.buttonText}}/>
        </div>
    );
}

const styles = {
    buttonContainer: {
        alignItems: 'center',
        borderRadius:5,
        cursor:'pointer',
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom:10,
        padding: 5,
        width: '98%',
        justifyContent: 'center',
    },
    buttonImage: {
        marginLeft:'10%',
        marginRight:'10%',
        maxWidth:64,
        padding:5,
        width:'7%',
    },
    buttonText: {
        color:"#fff",
        flex:1,
        letterSpacing:1.5,
        textAlign:'center',
        pointerEvents:'none',
    },
    container: {
        flexDirection: 'column',
        margin: 20,
        width:'70%'
    },
};