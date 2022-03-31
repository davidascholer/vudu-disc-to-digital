import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import AppBackground from '../components/AppBackground';
import BackButton from '../components/common/BackButton';

import AppContext from '../config/context';

import fetchReceipts from '../controller/fetchReceipts';

export default function ReceiptScreen() {

    //Routes.
    let navigate = useNavigate();

    //Static constants
    const EMPTY_MOVIE_MESSAGE = "you haven't purchased any tokens yet";

    const [receipts, setReceipts] = useState([]);
    const [emptyMsg, setEmptyMsg] = useState(EMPTY_MOVIE_MESSAGE);

    const appContext = useContext(AppContext);

    useEffect(() => {
        getUserReceipts();
    }, []);

    const getUserReceipts = async () => {
        const user = await appContext.getUser();
        if (!user) {
            navigate('/');
            return;
        }

        const receipts = await fetchReceipts(user.appID);

        if (!receipts) {
            setEmptyMsg("There was an issue fetching your receipts. Please refresh the page.");
            return;
        }

        setReceipts(receipts);

    }

    const Receipt = ({ children }) => {
        const formattedDate = formatDate(children.created)
        const formattedAmount = (children.amount/100).toFixed(2)

        function formatDate(date) {
            var a = new Date(date * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var day = a.getDate();
            return(`${month} ${day}, ${year}`);
        }

        return (
            <>
                <div style={styles.receiptContainer}>
                    <span style={styles.text}>Transaction id: {children.id}</span>
                    <span style={styles.text}>Amount: ${formattedAmount}</span>
                    <span style={styles.text}>Date of purchase: {formattedDate} </span>
                </div>
                <hr style={styles.hr}></hr>
            </>
        )
    };

    return (
        <AppBackground>
            <BackButton style={styles.backButton} />

            {/*Map all of the movies rectrieved from API.*/}
            <div style={styles.container}>
                {receipts.length > 0 && receipts.map((receipt, index) => (
                    <Receipt key={index}>
                        {receipt}
                    </Receipt>
                ))}
                {receipts.length === 0 &&
                    <p style={styles.text}>{emptyMsg}</p>
                }
            </div>

        </AppBackground>
    );
}

//styles
const styles = {
    backButton: {
        position:'relative',
        marginRight:'auto',
        left:10,
        top:10,
    },
    container: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%'
    },
    hr: {
        borderColor: '#aaa',
        display: 'block',
        opacity: '.5',
        width: '95%',
    },
    receiptContainer: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '5%',
        width: '100%'
    },
    text: {
        color: '#fff',
        marginTop: 8,
        marginBottom: 8,
        textAlign:'center',
        width:'100%',
    },
};