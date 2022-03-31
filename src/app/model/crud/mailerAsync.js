import client from '../api/client';
import { contactEndpoint } from '../api/endpoints';

//Updates the token count and adds a movie to the redemptions
const mailerAsync = async ( name, email, message, origin ) => {

    try {
        const data = await client.post(contactEndpoint,
            {
                name,
                email,
                message,
                origin
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
        // console.error(err);
    }

}

export default mailerAsync;