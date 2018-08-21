// import { isApiExternal } from '../../../../net';
// import Feature from '../connector';
// import schema from './schema.graphql';
// // import resolvers from './resolvers';
// import scopes from '../../scopes';
// import User from '../../sql';
// import settings from '../../../../../../../settings';
// // import getCurrentUser from './getCurrentUser';
//
// const grant = async (user, req) => {
//   return {};
// };
//
// const getCurrentUser = ({ req }) => {
//   return {
//     id: 1,
//     username: 'admin',
//     role: 'admin',
//     isActive: 1,
//     email: 'admin@example.com',
//     firstName: null,
//     lastName: null,
//     serial: null,
//     fbId: null,
//     fbDisplayName: null,
//     lnId: null,
//     lnDisplayName: null,
//     ghId: null,
//     ghDisplayName: null,
//     googleId: null,
//     googleDisplayName: null
//   };
// };
//
// const createContextFunc = async ({ req, connectionParams, webSocket, context }) => {
//   const user = context.user || (await getCurrentUser({ req, connectionParams, webSocket }));
//   console.log('user', user);
//   const auth = {
//     isAuthenticated: !!user,
//     scope: user ? scopes[user.role] : null
//   };
//   // const auth = {};
//
//   return {
//     User,
//     user,
//     auth
//   };
// };
//
// export default new Feature(
//   settings.user.auth.access.session.enabled
//     ? {
//         grant,
//         schema,
//         // createResolversFunc: resolvers,
//         createContextFunc
//         // middleware: app => {
//         //   app.use((req, res, next) => {
//         //     try {
//         //       attachSession(req);
//         //       next();
//         //     } catch (e) {
//         //       next(e);
//         //     }
//         //   });
//         // }
//       }
//     : {}
// );
