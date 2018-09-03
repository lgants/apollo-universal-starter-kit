// import { pick } from 'lodash';
// import passport from 'passport';
// import proxy from 'express-http-proxy';
// import GitHubStrategy from 'passport-github';
// import http from 'http';
// import request from 'request';

// import cookie from 'cookie';

import resolvers from './resolvers';
import Feature from '../connector';

// import User from '../../sql';
import settings from '../../../../../../../settings';
// import access from '../../access';
// import getCurrentUser from '../utils';
import { authenticate } from '../utils/authenticate';

let middleware;

if (settings.user.auth.github.enabled && !__TEST__) {
  middleware = app => {
    app.get('/auth/github', (req, res) => {
      // NOTE: use of req.query.expoUr; value is undefined on web
      // passport.authenticate('github', { state: req.query.expoUrl })(req, res, next);
      const ghRootOathUrl = 'https://github.com/login/oauth/authorize';
      const ghScopes = ['public_repo', 'read:repo_hook', 'user', 'read:discussion', 'notifications'];

      // res.redirect(`https://github.com/login/oauth/authorize?scope=user:email&client_id=405b0b4e8299aa38f8a9`);
      res.redirect(`${ghRootOathUrl}?scope=${ghScopes.join('%20')}&client_id=405b0b4e8299aa38f8a9`);

      // next(); NOTE: invocation of next will raise warnings
    });

    // NOTE: hardcoded backend url; should be moved to constants
    app.use('/auth/github/callback', async (req, res) => {
      const { code } = req.query;
      const provider = 'github';

      const response = await authenticate({ req, code, provider });
      // NOTE: transfer cookies to client redirect response
      res.setHeader('Set-Cookie', response.headers.raw()['set-cookie']);

      const [json] = await response.json();
      const { tokens, user } = json.data.authenticate;
      const redirectUrl = req.query.state;

      if (redirectUrl) {
        res.redirect(
          redirectUrl +
            (tokens
              ? '?data=' +
                JSON.stringify({
                  tokens,
                  user
                })
              : '')
        );
      } else {
        res.redirect('/profile');
      }

      // next(); NOTE: invocation of next will raise warnings
    });
  };
}

export default new Feature({ middleware, createResolversFunc: resolvers });
