import fetch from 'node-fetch';
import { apiUrl } from '../../../../net';

// export const authenticate = (req, res) => {
export const authenticate = async () => {
  const provider = 'github';
  const code = '123456';

  var mutation = `mutation authenticate($input: AuthenticateInput) {
    authenticate(input: $input) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }`;

  return await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
      // credentials: true
    },
    body: JSON.stringify([
      {
        operationName: 'authenticate',
        query: mutation,
        variables: {
          input: {
            provider,
            code
          }
        }
      }
    ])
  })
    .then(r => r.json())
    .then(data => data[0]);
};

export default authenticate;
