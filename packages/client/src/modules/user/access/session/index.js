import Feature from '../connector';
// import settings from '../../../../../../../settings';

import LOGOUT from './graphql/Logout.graphql';

const logout = client => client.mutate({ mutation: LOGOUT });

// NOTE: sessions setting is disabled; need to override setting for client
// export default new Feature(
//   settings.user.auth.access.session.enabled
//     ? {
//         logout
//       }
//     : {}
// );

export default new Feature({
  logout
});
