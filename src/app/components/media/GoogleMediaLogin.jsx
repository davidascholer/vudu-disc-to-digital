import React from 'react';
import { GoogleLogin } from 'react-google-login';

import GoogleIcon from '../../assets/images/google_icon_64.png';

export default function GoogleMediaLogin({ responseGoogle, style }) {

    return (
        <>
            <GoogleLogin
                clientId="202219569561-vouaqe5ld8p88h5so73624tl43stjb4b.apps.googleusercontent.com"
                render={renderProps => (
                    <div
                        style={{...styles.container,...style.container}}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}>
                        <span style={{...styles.text,...style.text}}>Login With Google</span>
                        <img style={{...styles.image,...style.image}} src={GoogleIcon}></img>
                    </div>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />

        </>
    );
}

const styles = {
    container: {
        backgroundColor: '#3F81ED',
    },
    image: {
        backgroundColor:'#fff',
        borderRadius:5,
        height: '10%',
        maxWidth:64,
    },
    text:{

    }
};