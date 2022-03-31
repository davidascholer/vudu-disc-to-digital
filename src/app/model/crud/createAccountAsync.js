import client from '../api/client';
import { createAccountEndpoint } from '../api/endpoints';
import filterError from '../../controller/filterError';

const createAccountAsync = async (name, email, password, id) => {

  try {

    const data = await client.post(createAccountEndpoint,
      {
        name: name,
        email: email,
        password: password,
        appID: id,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    return data;

  } catch (err) {
    return filterError(err);
  }

};

export default createAccountAsync;
