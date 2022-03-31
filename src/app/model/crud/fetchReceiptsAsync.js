import client from '../api/client';
import { receiptsEndpoint } from '../api/endpoints';

//Fetch receipts from server.
const fetchReceiptsAsync = async appID => {

    try {
        const data = await client.post(receiptsEndpoint,
            {
                appID            
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

export default fetchReceiptsAsync