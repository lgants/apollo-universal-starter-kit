// // import { pick } from 'lodash';
// // import passport from 'passport';
// // import proxy from 'express-http-proxy';
// // import GitHubStrategy from 'passport-github';
// // import http from 'http';
// // import request from 'request';
//
// // import cookie from 'cookie';
//
// import resolvers from './resolvers';
// import Feature from '../connector';
//
// // import User from '../../sql';
// import settings from '../../../../../../../settings';
// // import access from '../../access';
// // import getCurrentUser from '../utils';
// import { authenticate } from '../utils/authenticate';
//
// var cookie = require('cookie');
//
// let middleware;
//
// if (settings.user.auth.github.enabled && !__TEST__) {
//   middleware = app => {
//     app.get('/auth/github', (req, res, next) => {
//       // NOTE: use of req.query.expoUr; value is undefined on web
//       // passport.authenticate('github', { state: req.query.expoUrl })(req, res, next);
//       res.redirect(`https://github.com/login/oauth/authorize?scope=user:email&client_id=405b0b4e8299aa38f8a9`);
//
//       next();
//     });
//
//     // NOTE: hardcoded backend url; should be moved to constants
//     app.use('/auth/github/callback', async (req, res, next) => {
//       const { code } = req.query;
//       const provider = 'github';
//
//       const response = await authenticate({ req, code, provider });
//       const [json] = await response.json();
//       // const { tokens, user, errors } = json;
//
//       // res.cookie('sessionid', '80da2ia2lkgtvpqpejz44rl8l8rjbh2w');
//
//       // console.log(Object.getOwnPropertyNames(response.headers));
//       // const cookies = response.headers.raw()['set-cookie'];
//       // console.log('yolo');
//       // cookies.forEach(c => cookie.parse(c));
//       // console.log('raw', response.headers.raw()['set-cookie']);
//       // console.log('get', response.headers.get('set-cookie'));
//       // res.set('set-cookie', response.headers.get('set-cookie'));
//
//       // console.log('1', parse(response.headers.raw()['set-cookie']));
//       // console.log('2', parse(response.headers.get('set-cookie')));
//       // console.log('headers', JSON.stringify(response.headers));
//       // console.log('parsed headers', response.headers.get('set-cookie').length);
//       console.log('get set', response.headers.get('set-cookie'));
//       console.log('raw', response.headers.raw()['set-cookie']);
//
//       const raw = response.headers.raw()['set-cookie'];
//
//       const parsed = cookie.parse(raw[1]);
//       console.log('parsed', parsed);
//       // const cookies = response.headers.raw()['set-cookie'];
//
//       res.setHeader('Set-Cookie', response.headers.raw()['set-cookie']);
//
//       // for (let key in cookies) {
//       //   res.cookie(key, cookies[key]);
//       // }
//
//       // console.log('set', response.headers['set-cookie']);
//       // console.log('Set', response.headers['Set-Cookie']);
//
//       // console.log('res', res);
//
//       // console.log(response.request.headers['Cookies']);
//       // console.log('s', response.cookie());
//
//       // console.log('json', json);
//       const { tokens, user } = json.data.authenticate;
//       const redirectUrl = req.query.state;
//
//       console.log('user', user);
//       console.log('tokens', tokens);
//
//       if (redirectUrl) {
//         res.redirect(
//           redirectUrl +
//             (tokens
//               ? '?data=' +
//                 JSON.stringify({
//                   tokens,
//                   user
//                 })
//               : '')
//         );
//       } else {
//         res.redirect('/profile');
//       }
//
//       next();
//     });
//   };
// }
//
// export default new Feature({ middleware, createResolversFunc: resolvers });
