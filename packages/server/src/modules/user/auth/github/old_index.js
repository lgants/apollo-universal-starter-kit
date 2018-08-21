// import { pick } from 'lodash';
// import passport from 'passport';
// // import proxy from 'express-http-proxy';
// import GitHubStrategy from 'passport-github';
// // import http from 'http';
// // import request from 'request';
//
// import resolvers from './resolvers';
// import Feature from '../connector';
// import User from '../../sql';
// import settings from '../../../../../../../settings';
// import access from '../../access';
// import getCurrentUser from '../utils';
//
// let middleware;
//
// if (settings.user.auth.github.enabled && !__TEST__) {
//   passport.use(
//     new GitHubStrategy(
//       {
//         clientID: settings.user.auth.github.clientID,
//         clientSecret: settings.user.auth.github.clientSecret,
//         scope: settings.user.auth.github.scope,
//         callbackURL: '/auth/github/callback'
//       },
//       async function(accessToken, refreshToken, profile, cb) {
//         console.log('accessToken', accessToken);
//         const {
//           id,
//           username,
//           displayName,
//           emails: [{ value }]
//         } = profile;
//         try {
//           // TODO: this needs to be a request to the external api
//           let user = await User.getUserByGHIdOrEmail(id, value);
//
//           if (!user) {
//             const isActive = true;
//             const [createdUserId] = await User.register({
//               username: username ? username : displayName,
//               email: value,
//               password: id,
//               isActive
//             });
//
//             await User.createGithubAuth({
//               id,
//               displayName,
//               userId: createdUserId
//             });
//
//             user = await User.getUser(createdUserId);
//           } else if (!user.ghId) {
//             await User.createGithubAuth({
//               id,
//               displayName,
//               userId: user.id
//             });
//           }
//           return cb(null, pick(user, ['id', 'username', 'role', 'email']));
//         } catch (err) {
//           return cb(err, {});
//         }
//       }
//     )
//   );
//
//   middleware = app => {
//     app.use(passport.initialize());
//     app.get('/auth/github', (req, res, next) => {
//       // NOTE: use of req.query.expoUr; value is undefined on web
//       passport.authenticate('github', { state: req.query.expoUrl })(req, res, next);
//       // next();
//     });
//
//     app.get(
//       '/auth/github/callback',
//       passport.authenticate('github', { session: false, failureRedirect: '/login' }),
//       async function(req, res) {
//         console.log('req', req);
//         const user = await User.getUser(req.user.id);
//         console.log('user', user);
//         const redirectUrl = req.query.state;
//         console.log('redirect', redirectUrl);
//         const tokens = await access.grantAccess(user, req);
//         console.log('tokens', tokens);
//         const currentUser = await getCurrentUser(req, res);
//         console.log('currentUser', currentUser);
//
//         if (redirectUrl) {
//           res.redirect(
//             redirectUrl +
//               (tokens
//                 ? '?data=' +
//                   JSON.stringify({
//                     tokens,
//                     user: currentUser.data
//                   })
//                 : '')
//           );
//         } else {
//           res.redirect('/profile');
//         }
//       }
//     );
//   };
// }
//
// export default new Feature({ middleware, createResolversFunc: resolvers });
