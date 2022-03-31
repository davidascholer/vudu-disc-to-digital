import client from '../api/client';
import { getAccountEndpoint } from '../api/endpoints';

const getAccountAsync = async (id, password) => {

  try {
    const data = client.post(getAccountEndpoint,
      {
          appID:id,
          password:password
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
    console.log('err', err);
  }

};

export default getAccountAsync;