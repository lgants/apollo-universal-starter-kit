import fetch from 'node-fetch';
import { apiUrl } from '../../../../net';

// export const authenticate = (req, res) => {
export const authenticate = async ({ code, provider }) => {
  const mutation = `mutation authenticate($input: AuthenticateInput) {
    authenticate(input: $input) {
      tokens {
        accessToken
        refreshToken
      }
      user {
        username
        email
        role
        isActive
        email
        profile {
          firstName
          lastName
          fullName
        }
      }
    }
  }`;

  return await fetch(apiUrl, {
    method: 'POST',
    headers: {
      // ...req.headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      credentials: 'include'
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
  });
  // .then(r => {
  //   console.log('r', r.headers);
  //   console.log('json', r.json());
  //   return r.json();
  // })
  // .then(data => data[0]);
};

export default authenticate;
