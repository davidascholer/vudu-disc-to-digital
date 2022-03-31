import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import AppBackground from '../components/AppBackground';
import BackButton from '../components/common/BackButton';
import ContactForm from '../components/ContactForm';
import AlertDialogue from '../components/common/AlertDialogue';

import mailer from '../controller/mailer';

export default function ContactScreen() {

    //State vars.
    const [alertShown, setAlertShown] = useState(false);
    const [message, setMessage] = useState("");
    //React router dom methods.
    const location = useLocation();

    useEffect(() => {
        if (location.state)
            setMessage(location.state.msg);
    }, []);

    const handleSubmit = async (name, email, mes) => {

        const send = await mailer(name, email, mes, window.location.hostname);
        if (send.data)
            if (send.data.success)
                showAlert();
    }

    const showAlert = () => {
        setAlertShown(true);
        setMessage("");

        setTimeout(() => {
            setAlertShown(false);
        }, 3000);
    };

    return (
        <AppBackground>
            {alertShown &&
                <AlertDialogue
                    message={"Message Sent"}
                    okText={"OK"}
                    cancelText={"no thanks"}
                    hideCancelButton={true}
                    handleConfirm={() => setAlertShown(false)}
                    handleCancel={() => setAlertShown(false)} />
            }
            <BackButton style={styles.backButton} />
            <h1 style={{ ...styles.text, ...styles.header }}>
                Please contact me with any questions regarding shipping, pricing, or for general questions:
            </h1>
            {message === "" &&
                <ContactForm handleSubmit={handleSubmit} />
            }
            {message !== "" &&
                <ContactForm handleSubmit={handleSubmit} initMessage={message} />
            }
        </AppBackground>
    );
}

const styles = {
    backButton: {
        marginRight: 'auto',
        // width:300
    },
    text: {
        color: '#fff',
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
    },
};