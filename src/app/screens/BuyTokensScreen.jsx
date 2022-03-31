import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import AppBackground from '../components/AppBackground';
import BackButton from '../components/common/BackButton';
import StripeForm from '../components/StripeForm';

import AppContext from '../config/context';

import Banner from '../assets/images/banner.png';

//Don't call load stripe in render
// const publishableKey = 'pk_test_51KGmd5BUHT2ct0jdrIeNd4teBNudqF2GK6PdosUgwNZDkhYQrXK0bZd2F7R74rO0fPC7I3BiGZsp3DIeMt4rXqNa00Y5YRd1Zr';
const publishableKey = 'pk_live_51KGmd5BUHT2ct0jdsivKXNB5O0GF8RZWckzy6aV2fUU16aZTmvHDPkHiOFNG6GB0naWkPet4touv460ASEqsEliw00MGOHaWIm';
const stripePromise = loadStripe(publishableKey);

const purchaseOptions = [
    {
        id: "vdtd_1_2",
        price: "$1.99",
        description: "One Token"
    },
    {
        id: "vdtd_3_5",
        price: "$4.99",
        description: "Three Tokens"
    },
    {
        id: "vdtd_8_10",
        price: "$9.99",
        description: "Eight Tokens"
    },
    {
        id: "vdtd_20_20",
        price: "$19.99",
        description: "Twenty Tokens"
    },
    {
        id: "vdtd_60_50",
        price: "$49.99",
        description: "Sixty Tokens"
    },
    {
        id: "vdtd_u_100",
        price: "$99.99",
        description: "Unlimited Tokens"
    }
]

export default function BuyTokensScreen() {

    let navigate = useNavigate();

    const appContext = useContext(AppContext);

    const [userTokenCount, setUserTokenCount] = useState(0);
    const [user, setUser] = useState("");
    const [payDialogueShown, setPayDialogueShown] = useState(false);
    const [selectedOption, setSelectedOption] = useState({});


    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        const user = await appContext.getUser();

        if (user) {
            if (user.jwt){
                setUserTokenCount(user.tokens);
                setUser(user);
            }
        } else {
            navigate("/", { replace: true });
        }
    }

    const handleCancel = () => {
        setSelectedOption({});
        setPayDialogueShown(false);
    }

    const handleOptionClicked = option => {
        setSelectedOption(option);
        setPayDialogueShown(true);
    };

    const handlePurchaseSuccessful = (tokens,receiptID) =>{
        navigate('/purchase-successful', { state: { tokens: tokens, receiptID: receiptID } });
    };

    return (

        <Elements stripe={stripePromise}>
            <AppBackground>
                {payDialogueShown &&
                    <div style={styles.dialogue} onClick={handleCancel}>
                        <StripeForm option={selectedOption} user={user} setUser={appContext.setUser} purchaseSuccessful={handlePurchaseSuccessful}/>
                    </div>
                }
                <BackButton style={styles.backButton} />

                <div>
                    <h1 style={styles.header}>
                        Purchase Tokens
                    </h1>
                    <h2 style={styles.headerSub}>
                        You currently have {userTokenCount} tokens.
                    </h2>
                </div>
                <div style={styles.optionsContainer}>

                    {purchaseOptions.map((option, i) => (
                        <>
                            <div key={option.id} onClick={() => handleOptionClicked(option)} style={{ ...styles.option, ...{ backgroundImage: "url(" + Banner + ")" } }}>
                                {/* <span style={styles.optionText}>{option.description}</span> */}
                                <span style={styles.optionText}>{option.description + "\n" + option.price}</span>
                            </div>

                            {(i !== purchaseOptions.length - 1) &&
                                <hr style={styles.hr}></hr>
                            }
                        </>
                    ))}
                </div>

            </AppBackground>
        </Elements>
    );
}

const styles = {

    backButton:{
        position:'relative',
        marginRight:'auto',
        left:10,
        top:10,
    },
    dialogue: {
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,.85)',
        display:'flex',
        height: '100vh',
        justifyContent:'center',
        position: 'fixed',
        width: '100vw',
        zIndex: 1,
    },
    header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 800,
    },
    hr: {
        borderColor: '#aaa',
        display: 'block',
        marginBottom: 20,
        marginTop: 20,
        opacity: '.5',
        width: '95%',
    },
    option: {
        alignItems: 'center',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        cursor: 'pointer',
        display: 'flex',
        height: '15vw',
        justifyContent: 'center',
        margin: 10,
        maxHeight: 80,
        position: 'relative',
        width: '100%'
    },
    optionsContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 600,
        width: '100%',
    },
    optionText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 500,
    },
    headerSub: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 400,
    },
};

//add CardElement @ 9:40