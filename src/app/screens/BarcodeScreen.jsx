/*
Takes in a 12 digit barcode number and create a barcode as follows:
|q    | | | | | |   | | | | | |    q|
|u    | | | | | |   | | | | | |    u|
|i    | | | | | | m | | | | | |    i|
|e  g | | | | | | i | | | | | | g  e|
|t  u | | | | | | d | | | | | | u  t|
|   a | | | | | | d | | | | | | a   |
|z  r | | | | | | l | | | | | | r  z|
|o  d | | | | | | e | | | | | | d  o|
|n    | | | | | |   | | | | | |    n|
|e    | | | | | |   | | | | | |    e|
      1 2 3 4 5 6   7 8 9 1 1 1
                digits    0 1 2

Each guard is 3 lines
The middle is 5 lines
Each bar is 7 lines
Total: 95

Each line is going to be 3 pixels wide.
That makes our minimum width 285 pixels.

Ideal quiet zone (space to left and right) is 9 lines * 3 pixels * 2 quiet zones = 54
so our ideal width is 339, but we can make do for smaller screen sizes.
*/
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import AppBackground from '../components/AppBackground';
import BackButton from '../components/common/BackButton';

const barcodeCodes = {
    "quietZone": [0, 0, 0, 0, 0, 0, 0, 0, 0],
    "guard": [1, 0, 1],
    "middle": [0, 1, 0, 1, 0],
    "0": [0, 0, 0, 1, 1, 0, 1],
    "1": [0, 0, 1, 1, 0, 0, 1],
    "2": [0, 0, 1, 0, 0, 1, 1],
    "3": [0, 1, 1, 1, 1, 0, 1],
    "4": [0, 1, 0, 0, 0, 1, 1],
    "5": [0, 1, 1, 0, 0, 0, 1],
    "6": [0, 1, 0, 1, 1, 1, 1],
    "7": [0, 1, 1, 1, 0, 1, 1],
    "8": [0, 1, 1, 0, 1, 1, 1],
    "9": [0, 0, 0, 1, 0, 1, 1],
}

export default function BarcodeScreen() {
    //State vars.
    const [barcodeArray, setBarcodeArray] = useState([]);
    //React router dom methods.
    const { state } = useLocation();
    let navigate = useNavigate();
    //Location vars.
    const {upcData: barcodeString, title} = state;

    useEffect(() => {
        propagate();
    }, [])

    const propagate = async () => {
        const generatedBarcodeArray = await generateBarcode(barcodeString);
        await setBarcodeArray(generatedBarcodeArray);

    };

    const Bar = ({ background }) => {
        return (
            <div
                style={{
                    backgroundColor: background,
                    width: 3,
                    height: 200
                }}
            ></div>
        )
    }

    const generateBarcode = code => {

        const barcodeArray = code.split("");

        if (barcodeArray.length !== 12)
            return barcodeCodes["guard"];

        const firstHalf = [
            ...barcodeCodes[barcodeArray[0]],
            ...barcodeCodes[barcodeArray[1]],
            ...barcodeCodes[barcodeArray[2]],
            ...barcodeCodes[barcodeArray[3]],
            ...barcodeCodes[barcodeArray[4]],
            ...barcodeCodes[barcodeArray[5]]
        ];

        const reversedBarcodeList1 = notGateFromString(barcodeCodes[barcodeArray[6]]);
        const reversedBarcodeList2 = notGateFromString(barcodeCodes[barcodeArray[7]]);
        const reversedBarcodeList3 = notGateFromString(barcodeCodes[barcodeArray[8]]);
        const reversedBarcodeList4 = notGateFromString(barcodeCodes[barcodeArray[9]]);
        const reversedBarcodeList5 = notGateFromString(barcodeCodes[barcodeArray[10]]);
        const reversedBarcodeList6 = notGateFromString(barcodeCodes[barcodeArray[11]]);

        const secondHalf = [
            ...reversedBarcodeList1,
            ...reversedBarcodeList2,
            ...reversedBarcodeList3,
            ...reversedBarcodeList4,
            ...reversedBarcodeList5,
            ...reversedBarcodeList6,
        ];

        function notGateFromString(c) {
            return c.map(bar => {
                if (bar === 0)
                    return 1
                if (bar === 1)
                    return 0;
            })
        }

        return [
            ...barcodeCodes["guard"],
            ...firstHalf,
            ...barcodeCodes["middle"],
            ...secondHalf,
            ...barcodeCodes["guard"]
        ];
    }

    const handleReportProblem = () => {
        const message = `Bug reported regarding movie: ${title}\n\nPlease state the problem below (e.g. code didn't work, etc.) and we'll be get back to you to make it right.\n\n`;
        navigate('/contact', { state: { msg: message } });
    }

    return (
        <AppBackground style={{minWidth:285}}>
            <BackButton style={styles.backButton} />
            <div style={styles.container}>
                <span style={styles.text}>{title}</span>
                <div style={styles.barcodeContainer}>
                    {barcodeArray.map((bar, index) => {
                        if (bar === 0) {
                            return (<Bar key={index} background='white' />)
                        }
                        if (bar === 1) {
                            return (<Bar key={index} background='black' />)
                        }
                    }
                    )}
                </div>
            </div>
            <div onClick={()=>handleReportProblem()} style={styles.outerTextContainer}><span style={styles.outerText}>Report a Problem</span></div>
        </AppBackground>
    );
}

const styles = {
    backButton:{
        position:'absolute',
        left:10,
        top:10,
    },
    barcodeContainer: {
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        minWidth:285,
        paddingVertical: 50,
        width: '100%',
    },
    container: {
        alignItems: 'center',
        backgroundColor:'#fff',
        display: 'flex',
        flexDirection: 'column',
        height:300,
        justifyContent: 'center',
        margin:'auto',
        paddingBottom:100,
        width:339,
    },
    outerText: {
        color:'#fff',
        fontSize:12,
        pointerEvents:'none',
        textAlign: 'center',
    },
    outerTextContainer: {
        cursor:'pointer',
        marginBottom:100,
    },
    text: {
        color:'#000',
        margin: 50,
        textAlign: 'center',
    },
}