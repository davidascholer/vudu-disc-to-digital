import client from '../api/client';
import { genPWCodeEndpoint } from '../api/endpoints';

//Updates the token count and adds a movie to the redemptions
const genPWCodeAsync = async (appID,origin) => {

    try {
        const data = await client.post(genPWCodeEndpoint,
            {
                appID:appID,
                origin:origin
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
        console.error(err);
    }

}

export default genPWCodeAsync;