// import { pick } from 'lodash';
// import passport from 'passport';
// import proxy from 'express-http-proxy';
// import GitHubStrategy from 'passport-github';
// import http from 'http';
// import request from 'request';

import resolvers from './resolvers';
import Feature from '../connector';
// import User from '../../sql';
import settings from '../../../../../../../settings';
// import access from '../../access';
// import getCurrentUser from '../utils';
import { authenticate } from '../utils/authenticate';

let middleware;

if (settings.user.auth.github.enabled && !__TEST__) {
  // passport.use(
  //   new GitHubStrategy(
  //     {
  //       clientID: settings.user.auth.github.clientID,
  //       clientSecret: settings.user.auth.github.clientSecret,
  //       scope: settings.user.auth.github.scope,
  //       callbackURL: '/auth/github/callback'
  //     },
  //     async function(accessToken, refreshToken, profile, cb) {
  //       const {
  //         id,
  //         username,
  //         displayName,
  //         emails: [{ value }]
  //       } = profile;
  //       try {
  //         let user = await User.getUserByGHIdOrEmail(id, value);
  //
  //         if (!user) {
  //           const isActive = true;
  //           const [createdUserId] = await User.register({
  //             username: username ? username : displayName,
  //             email: value,
  //             password: id,
  //             isActive
  //           });
  //
  //           await User.createGithubAuth({
  //             id,
  //             displayName,
  //             userId: createdUserId
  //           });
  //
  //           user = await User.getUser(createdUserId);
  //         } else if (!user.ghId) {
  //           await User.createGithubAuth({
  //             id,
  //             displayName,
  //             userId: user.id
  //           });
  //         }
  //         return cb(null, pick(user, ['id', 'username', 'role', 'email']));
  //       } catch (err) {
  //         return cb(err, {});
  //       }
  //     }
  //   )
  // );

  middleware = app => {
    // app.use(passport.initialize());
    app.get('/auth/github', (req, res, next) => {
      // NOTE: use of req.query.expoUr; value is undefined on web
      // passport.authenticate('github', { state: req.query.expoUrl })(req, res, next);
      res.redirect(`https://github.com/login/oauth/authorize?scope=user:email&client_id=405b0b4e8299aa38f8a9`);
      next();
    });

    // NOTE: hardcoded backend url; should be moved to constants
    app.use('/auth/github/callback', async (req, res, next) => {
      const { data } = await authenticate();
      const tokens = data.authenticate.tokens;
      const currentUser = data.authenticate.user;
      const redirectUrl = req.query.state;

      if (redirectUrl) {
        res.redirect(
          redirectUrl +
            (tokens
              ? '?data=' +
                JSON.stringify({
                  tokens,
                  user: currentUser.data
                })
              : '')
        );
      } else {
        res.redirect('/profile');
      }

      next();

      // const options = {
      //   uri,
      //   method: 'POST',
      //   credentials: 'include',
      //   mode: 'cors',
      //   body: JSON.stringify(postData),
      //   headers: {
      //     'X-CSRFToken': csrftoken,
      //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      //     'X-Requested-With': 'XMLHttpRequest',
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //     'X-CSRFToken': csrftoken
      //   }
      // };
    });

    // app.get(
    //   '/auth/github/callback',
    //   passport.authenticate('github', { session: false, failureRedirect: '/login' }),
    //   async function(req, res) {
    //     const user = await User.getUser(req.user.id);
    //     const redirectUrl = req.query.state;
    //     const tokens = await access.grantAccess(user, req);
    //     const currentUser = await getCurrentUser(req, res);
    //
    //     if (redirectUrl) {
    //       res.redirect(
    //         redirectUrl +
    //           (tokens
    //             ? '?data=' +
    //               JSON.stringify({
    //                 tokens,
    //                 user: currentUser.data
    //               })
    //             : '')
    //       );
    //     } else {
    //       res.redirect('/profile');
    //     }
    //   }
    // );
  };
}

export default new Feature({ middleware, createResolversFunc: resolvers });
