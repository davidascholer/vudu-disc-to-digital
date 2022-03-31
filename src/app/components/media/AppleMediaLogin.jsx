import React from 'react';
import AppleSignin from 'react-apple-signin-auth';

import AppleIcon from '../../assets/images/apple_icon_64.png';

export default function AppleMediaLogin({ responseApple, style }) {

    return (
        <>
            <AppleSignin
                /** Auth options passed to AppleID.auth.init() */
                authOptions={{
                    /** Client ID - eg: 'com.example.com' */
                    clientId: 'com.vududisctodigital',
                    /** Requested scopes, seperated by spaces - eg: 'email name' */
                    scope: 'email name',
                    /** Apple's redirectURI - must be one of the URIs you added to the serviceID - the undocumented trick in apple docs is that you should call auth from a page that is listed as a redirectURI, localhost fails */
                    redirectURI: 'https://www.vududisctodigital.com',
                    /** State string that is returned with the apple response */
                    state: 'state',
                    /** Nonce */
                    nonce: 'nonce',
                    /** Uses popup auth instead of redirection */
                    usePopup: true
                }} // REQUIRED
                /** General props */
                uiType="dark"
                /** className */
                className="apple-auth-btn"
                /** Removes default style tag */
                noDefaultStyle={false}
                /** Allows to change the button's children, eg: for changing the button text */
                buttonExtraChildren="Continue with Apple"
                /** Extra controlling props */
                /** Called upon signin success in case authOptions.usePopup = true -- which means auth is handled client side */
                onSuccess={(response) => responseApple(response)} // default = undefined
                /** Called upon signin error */
                onError={(error) => console.error(error)} // default = undefined
                /** Skips loading the apple script if true */
                skipScript={false} // default = undefined
                /** Apple image props */
                iconProp={{ style: { marginTop: '10px' } }} // default = undefined
                /** render function - called with all props - can be used to fully customize the UI by rendering your own component  */
                render={(props) =>
                    <div style={{ ...styles.container, ...style.container }} {...props}>
                        <span style={{ ...styles.text, ...style.text, color: '#000' }}>Login with Apple</span>
                        <img style={{ ...styles.image, ...style.image }} src={AppleIcon}></img>
                    </div>

                }
            />
        </>
    );
}

const styles = {
    container: {
        backgroundColor: '#fff',
    },
    image: {
        height: '10%',
        maxWidth: 64,
    },
    text: {
        color: '#000'
    },
};