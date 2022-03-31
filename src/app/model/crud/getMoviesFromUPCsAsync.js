import client from '../api/client';
import { movieDataFromUPCsEndpoint } from '../api/endpoints';

const getMoviesFromUPCsAsync = async movieUPCs => {

  try {
    const data = client.post(movieDataFromUPCsEndpoint,
      {
        movieUPCs
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
    return { error: err }
  }

};

export default getMoviesFromUPCsAsync;