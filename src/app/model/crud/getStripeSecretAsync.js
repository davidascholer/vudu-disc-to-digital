import client from '../api/client';
import { getStripeSecretEndpoint } from '../api/endpoints';

//Updates the token count and adds a movie to the redemptions
const getStripeSecretAsync = async priceID => {

    try {
        const data = await client.post(getStripeSecretEndpoint,
            {
                priceID:priceID,
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

export default getStripeSecretAsync;