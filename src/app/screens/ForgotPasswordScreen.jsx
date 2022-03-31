import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

import AppBackground from '../components/AppBackground';
import BackButton from '../components/common/BackButton';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import ResetPasswordForm from '../components/ResetPasswordForm';
import AlertDialogue from '../components/common/AlertDialogue';

import genPWCode from '../controller/genPWCode';
import resetPW from '../controller/resetPW';

export default function ForgotPasswordScreen() {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [forgotPasswordShown, setForgotPasswordShown] = useState(true);
    const [errorMsg, setErroMsg] = useState("");
    const [codeNotSentDialogue, setCodeNotSentDialogue] = useState(false);
    const [successDialogue, setSuccessDialogue] = useState(false);

    const successMessage = useRef("");

    const handleForgotPasswordSubmit = async (email) => {

        const code = await genPWCode(email, window.location.hostname);

        setErroMsg("");

        if (code.error) {
            if (code.error === "Incorrect email or password.")
                return setErroMsg("this email is not registered");
            else
                return setErroMsg(code.error);
        }

        setErroMsg("");
        setEmail(email);
        setForgotPasswordShown(false);
    }

    const handleResetPasswordSubmit = async (values) => {

        setErroMsg("");

        const { email, password, code } = values;
        const returnMsg = await resetPW(email, password, code);

        if (returnMsg.error)
            return setErroMsg(returnMsg.error)

        setErroMsg("");
        successMessage.current = returnMsg.data.success;
        setSuccessDialogue(true);

    }

    return (
        <AppBackground>
            <BackButton style={styles.backButton} />
            {forgotPasswordShown &&
                <>
                    <h1 style={{ ...styles.text, ...styles.header }}>
                        forgot password
                    </h1>
                    <ForgotPasswordForm handleSubmit={handleForgotPasswordSubmit} />
                    <span style={styles.error}>{errorMsg}</span>
                    <h2 style={{ ...styles.text, ...styles.header }}>
                        <span style={{ display: 'block' }}>Enter your email and a temporary code will be sent for you to reset your password.</span>
                    </h2>
                </>
            }
            {!forgotPasswordShown &&
                <>
                    <h1 style={{ ...styles.text, ...styles.header }}>
                        reset password
                    </h1>
                    <ResetPasswordForm email={email} handleSubmit={handleResetPasswordSubmit} />
                    <span style={styles.error}>{errorMsg}</span>
                    <h2 style={{ ...styles.text, ...styles.header }}>
                        <span style={{ display: 'block' }}>Check your email and enter the code provided.</span>
                    </h2>
                    <div style={{ ...styles.text, ...styles.header, ...{ cursor: 'pointer' } }} onClick={() => setCodeNotSentDialogue(true)}>
                        <span style={{ pointerEvents: 'none' }}>resend code</span>
                    </div>
                    {codeNotSentDialogue &&
                        <AlertDialogue
                            title={"Resend Code"}
                            message={"Sometimes the email takes a few minutes or may get sent to your spam folder. Are you sure you want to resend the code?"}
                            okText={"Send Code"}
                            handleConfirm={() => handleForgotPasswordSubmit(email)}
                            handleCancel={() => setCodeNotSentDialogue(false)} />
                    }
                    {successDialogue &&
                        <AlertDialogue
                            title={"New Password Saved"}
                            message={"Hurray! New password saved. Go login with that new password."}
                            okText={"Let's Go"}
                            hideCancelButton={true}
                            handleConfirm={() => navigate(-1)}
                        />
                    }
                </>
            }
        </AppBackground>
    );
}

const styles = {
    backButton: {
        marginRight: 'auto',
        // width:300
    },
    error: {
        color: 'red',
        fontSize: 20,
        fontWeight: 600,
        letterSpacing: 1,
        textAlign: 'center',
        width: '90%'
    },
    text: {
        color: '#fff',
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
    },
};