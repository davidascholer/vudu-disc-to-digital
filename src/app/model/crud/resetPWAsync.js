import client from '../api/client';
import { resetPWEndpoint } from '../api/endpoints';

//Updates the token count and adds a movie to the redemptions
const resetPWAsync = async (email, password, code) => {

    try {
        const data = await client.post(resetPWEndpoint,
            {
                email,
                password,
                code
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

export default resetPWAsync;