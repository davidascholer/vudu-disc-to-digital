import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
//Component imports
import FormSection from '../components/form/FormSection';
import AppBackground from '../components/AppBackground';
import Button from "../components/common/Button";
import MediaLogin from "../components/MediaLogin";

import getAccount from '../controller/getAccount';
import createAccount from '../controller/createAccount';

import AppContext from "../config/context";
import appColors from '../styles/appColors';
import appStyles from '../styles/appStyles';
import '../styles/fonts.css'

export default function SignInScreen({ navigation }) {
    
    //Routes.
    let navigate = useNavigate();
    //Global settings
    const appContext = useContext(AppContext);
    //Local vars (stateful)
    const [currentScreen, setCurrentScreen] = useState("signIn");
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    //Check if user is already signed in.
    useEffect(() => {
        getUserContent();
    }, [])

    //Rest the error message if the screen changes.
    useEffect(() => {
        setErrMsg("");
    }, [currentScreen]);

    //Lookup account and set a token if credentials check out
    const handleCreateAccount = async (id, password, name) => {
        const user = await createAccount(name, id, password);
        if (user.error)
            setErrMsg(user.error);
        else {
            await appContext.setUser(user);
            navigate("/home");
        }
    }

    const handleLogin = async (id, password) => {
        const user = await getAccount(id, password);
        if (user.error) {
            setErrMsg(user.error);
            setShowForgotPassword(true);
        } else {
            await appContext.setUser(user);
            navigate("/home");
        }
    }

    const responseFacebook = (response) => {

        if (response.status)
            return;

        let { name, userID, email } = response;

        handleMediaLogin(name, email, null, userID);
    }

    const responseGoogle = (response) => {

        if (response) {
            
            // console.log(JSON.stringify(response));
        if (response.error)
            return;

            let { name, googleId, email } = response.profileObj;
            handleMediaLogin(name, email, null, googleId);
        }
    }

    const responseApple = (response) => {

        var decoded = jwt_decode(response.authorization.id_token);

        if (response.status)
            return;

        let { name, sub: id, email } = decoded;

        name = undefined ? "" : name;

        handleMediaLogin(name, email, null, id);
    }

    const handleMediaLogin = async (name, email, password, id) => {


        const user = await createAccount(name, email, password, id);

        if (user.error)
            setErrMsg(user.error);
        else {
            if (user) {
                const userSaved = await appContext.setUser(user);
                if (userSaved.success)
                    navigate("/home");
            }
        }

    }


    //Save the user object to the local storage and app context.
    const getUserContent = async () => {

        const user = await appContext.getUser();

        if (user)
            if (user.jwt)
                navigate("/home");

        setErrMsg("");
    }

    return (
        <AppBackground style={styles.container}>

            {currentScreen === "signUp" &&
                <div style={styles.formContainer}>
                    <h1 style={styles.header}><span className="fontMedium">VUDU</span> <span className="fontLight">Disc To Digital</span></h1>
                    <FormSection
                        buttonConfig={{ styles: appStyles.button, title: "Create Accounnnt" }}
                        type={currentScreen}
                        handleSubmit={handleCreateAccount}
                    >
                    </FormSection>
                    {errMsg !== "" &&
                        <span style={styles.error}>{errMsg}</span>
                    }
                    <div style={styles.border}>
                        <hr style={styles.borderHr}></hr>
                        <span style={styles.borderText}>OR</span>
                    </div>
                    <Button title={"Sign Issn"} buttonStyles={appStyles.button} onClick={() => setCurrentScreen("signIn")}></Button>

                </div>
            }
            {currentScreen === "signIn" &&
                <div style={styles.formContainer}>
                    <h1 style={styles.header}><span className="fontMedium">VUDU</span> <span className="fontLight">Disc To Digital</span></h1>
                    <FormSection
                        buttonConfig={{ styles: appStyles.button, title: "Sign In" }}
                        type={currentScreen}
                        handleSubmit={handleLogin}
                    />
                    {errMsg !== "" &&
                        <span style={styles.error}>{errMsg}</span>
                    }
                    {showForgotPassword &&
                        <div style={styles.textContainer} onClick={() => navigate("/forgot-password")}><span style={styles.text}>forgot password?</span></div>
                    }
                    <div style={styles.border}>
                        <hr style={styles.borderHr}></hr>
                        <span style={styles.borderText}>OR</span>
                    </div>
                    <Button title={"Create Account"} buttonStyles={appStyles.button} onClick={() => setCurrentScreen("signUp")}></Button>
                    <div style={styles.border}>
                        <hr style={styles.borderHr}></hr>
                    </div>
                </div>
            }
            <MediaLogin
                responseFacebook={responseFacebook}
                responseGoogle={responseGoogle}
                responseApple={responseApple}
                style={{ container: styles.mediaContainer }}
            />
            <div
                style={styles.noSignIn}
                onClick={() => navigate('/home')} >
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 400, pointerEvents: 'none', }}>continue without signing in</span>
            </div>

        </AppBackground>
    );
}

const styles = {
    border: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    borderHr: {
        borderColor: appColors.textHint,
        maxWidth: 400,
        position: 'absolute',
        opacity: '.5',
        width: '80%',
    },
    borderText: {
        backgroundColor: appColors.background,
        color: appColors.textHint,
        position: 'absolute',
        padding: '0 5px',
    },
    container: {
    },
    error: {
        color: 'red',
        margin: '20px auto',
        textAlign: 'center',
    },
    formContainer: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 600,
        minWidth: 320,
        overflow: 'hidden',
        width: '80%'
    },
    header: {
        color: 'white',
        textAlign: 'center',
        width: '100%',
    },
    mediaContainer: {
        maxWidth: 500,
    },
    noSignIn: {
        cursor: 'pointer',
        width: '100%',
        textAlign: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        letterSpacing: 1,
        pointerEvents: 'none',
    },
    textContainer: {
        cursor: 'pointer',
        marginTop: 5,
        textAlign: 'center',
        width: '100%',
    },
};
