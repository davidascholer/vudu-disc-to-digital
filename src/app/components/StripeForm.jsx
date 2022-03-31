import React, { useEffect, useState } from 'react';
import { useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

import Button from './common/Button';
import LoadingOverlay from '../components/common/LoadingOverlay';
import CreditCardImages from '../assets/images/credit_cards.png';

import purchaseTokens from '../controller/purchaseTokens';
import getStripeSecret from '../controller/getStripeSecret';

import appColors from '../styles/appColors';

export default function StripeForm({ option, purchaseSuccessful, user, setUser }) {
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async e => {
        e.preventDefault();

        setLoading(true);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const clientSecret = await getClientSecret();
        //tax code txcd_10000000

        // Confirm the payment on the client.
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
            }
        });

        if (stripeError) {
            setErrorMsg(stripeError.message);
            setLoading(false);
            return;
        }

        setErrorMsg("");

        const { amount, created, id } = paymentIntent;
        const receipt = { id: id, amount: amount, created: created };

        const returnObj = await purchaseTokens(user.appID, option.id, receipt);

        //Though extremely rare, this could happen if the document database goes down but the server is still up.
        if (!returnObj) {
            console.error(`A customer paid but did not receive tokens! customer:${user.appID} tokenID purchased: ${option.id}`);
            setErrorMsg("The database is being lazy. If you did not receive your tokens, please use the contact form and you'll receive a lil bonus ;)")
            setLoading(false);
            return;
        }

        const newTokenCount = returnObj.data.tokens;
        await setUser({ ...user, tokens: newTokenCount, userStatus:"9" });

        setLoading(false);
        purchaseSuccessful(newTokenCount, receipt.id);

    };

    const getClientSecret = async () => {

        // Create payment intent on the server.
        const response = await getStripeSecret(option.id);

        if (response.error) {
            console.error("Couldn't fetch client token from server.");
            return;
        }

        return response.clientSecret;

    };

    return (
        <div>
            <div style={styles.container} onClick={e => e.stopPropagation()}>
                {loading &&
                    <LoadingOverlay loading={loading} />
                }
                <form id='payment-form' onSubmit={handleSubmit} style={styles.form}>
                    <h1 style={{ ...styles.label, ...styles.header }} >Card Information</h1>
                    <div style={styles.cardNumberContainer}>
                        <span style={{ ...styles.labelSub, ...styles.cardNumberChild }}>Credit card number</span>
                        <img src={CreditCardImages} style={{ ...styles.cardNumberChild, ...styles.cardImage }} />
                    </div>
                    <div style={styles.cardInput}>
                        <CardNumberElement options={{ style: { base: styles.cardInputText } }} />
                    </div>
                    <div style={styles.cardNumberContainer}>
                        <span style={{ ...styles.labelSub, ...styles.cardNumberChild }}>Expiration date</span>
                        <span style={{ ...styles.labelSub, ...styles.cardNumberChild }}>Security code</span>
                    </div>

                    <div style={styles.cardExtrasContainer}>
                        <div style={styles.cardInput}>
                            <CardExpiryElement options={{ style: { base: styles.cardInputText } }} />
                        </div>
                        <div style={styles.cardInput}>
                            <CardCvcElement options={{ style: { base: styles.cardInputText } }} />
                        </div>
                    </div>
                    <div style={styles.totalContainer}>
                        <span style={{ ...styles.label, ...styles.totalSub }}>Total:</span>
                        <span style={{ ...styles.text, ...styles.totalSub }}>{option.price}</span>
                    </div>
                    <Button style={styles.button} title={"Confirm"} />
                    <span style={styles.error}>{errorMsg}</span>
                </form>
            </div>
        </div>
    );
}

const styles = {
    button: {
        padding: 5,
        width: '100%',
    },
    card: {
        color: 'green'
    },
    cardExtrasContainer: {
        display: 'flex'
    },
    cardImage: {
        objectFit: 'contain',
        width: 120,
    },
    cardInput: {
        border: '1px solid',
        borderColor: appColors.border,
        flex: 1,
        margin: 3,
        marginBottom: 15,
        padding: 15,
    },
    cardInputText: {
        color: '#ddd',
    },
    cardNumberContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardNumberChild: {
        flex: 1,
        padding: 10,
    },
    container: {
        alignItems: 'center',
        backgroundColor: appColors.background,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        padding: 70,
    },
    creditCardNumber: {
        flex: 1
    },
    error:{
        color: 'red', 
        display:'inline-block',
        textAlign:'center',
        padding:5,
        width:'100%',
    },
    form: {
        width: '100%',
    },
    header: {
        marginBottom: 10,
    },
    label: {
        color: '#ddd',
        fontSize: 18,
        fontWeight: 400,
    },
    labelSub: {
        color: '#aaa',
        fontSize: 12,
        fontWeight: 400,
        marginBottom: 5,
    },
    text: {
        color: '#fff'
    },
    totalContainer: {
        alignItems: 'center',
        display: 'flex',
        marginBottom: 10,
    },
    totalSub: {
        flex: 1
    },
}