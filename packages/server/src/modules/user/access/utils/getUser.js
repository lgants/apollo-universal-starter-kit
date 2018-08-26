import fetch from 'node-fetch';
import { apiUrl } from '../../../../net';

// export const authenticate = (req, res) => {
export const getCurrentUser = async ({ req }) => {
  const query = `
    query {
      currentUser {
        id
        username
        role
        isActive
        email
        profile {
          firstName
          lastName
          fullName
        }
        auth {
          certificate {
            serial
          }
          facebook {
            fbId
            displayName
          }
          google {
            googleId
            displayName
          }
          github {
            ghId
            displayName
          }
          linkedin {
            lnId
            displayName
          }
        }
      }
  }`;

  // profile: UserProfile
  // auth: UserAuth
  // profile: UserProfile
  // auth: UserAuth

  return await fetch(apiUrl, {
    method: 'POST',
    headers: {
      ...req.headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      credentials: 'include'
    },
    body: JSON.stringify([
      {
        query
        // variables: {}
      }
    ])
  }).then(r => {
    return r.json();
  });
  // .then(data => data[0]);
};

export default getCurrentUser;
