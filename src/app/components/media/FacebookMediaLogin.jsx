import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import FacebookIcon from '../../assets/images/facebook_icon_64.png';

export default function FacebookMediaLogin({ responseFacebook, style }) {

    return (
        <>
            <FacebookLogin
                appId="303864098295051"
                callback={responseFacebook}
                fields="name,email"
                render={renderProps => (
                    <div
                        style={{...styles.container,...style.container}}
                        onClick={renderProps.onClick}>
                        <span style={{...styles.text,...style.text}}>Login With Facebook</span>
                        <img style={{...styles.image,...style.image}} src={FacebookIcon}></img>
                    </div>
                )}
            />
        </>
    );
}

const styles = {
    container: {
        backgroundColor: '#3b5998',
    },
    image: {
        height: '10%',
        maxWidth:64,
    },
};