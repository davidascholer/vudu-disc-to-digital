/*
    On the server, the method:
    -Gets the token count.
    -Subtracts token count by 1.
    -Adds the barcodeID to the 'redemptions' array.
    -Returns the new token count and new redemption array.
*/

import client from '../api/client';
import { purchaseTokensEndpoint } from '../api/endpoints';

//Updates the token count and adds a movie to the redemptions
const redeemTokenAsync = async (appID, purchaseID, receipt) => {

    try {
        const data = await client.post(purchaseTokensEndpoint,
            {
                appID:appID,
                purchaseID:purchaseID,
                receipt:receipt
            },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )

        return data;

    } catch (err) {
        console.log(err);
    }

}

export default redeemTokenAsync;