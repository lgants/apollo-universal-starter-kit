import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

// import { isApiExternal } from './net';
import modules from './modules';
import websiteMiddleware from './middleware/website';
import graphiqlMiddleware from './middleware/graphiql';
import graphqlMiddleware from './middleware/graphql';
import errorMiddleware from './middleware/error';

const app = express();

for (const applyBeforeware of modules.beforewares) {
  applyBeforeware(app);
}

// Don't rate limit heroku
app.enable('trust proxy');

const corsOptions = {
  credentials: true,
  origin: true
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

for (const applyMiddleware of modules.middlewares) {
  applyMiddleware(app);
}

if (__DEV__) {
  app.get('/servdir', (req, res) => {
    res.send(process.cwd() + path.sep);
  });
}
// if (!isApiExternal) {
//   app.post(__API_URL__, (...args) => graphqlMiddleware(...args));
// } else {
//   console.log('yo');
// }
// app.post(__API_URL__, (...args) => graphqlMiddleware(...args));
app.post('/graphql', (...args) => graphqlMiddleware(...args));

app.get('/graphiql', (...args) => graphiqlMiddleware(...args));
app.use((...args) => {
  // console.log('yello');
  // console.log(Object.getOwnPropertyNames(args[0]));
  // [ '_readableState',
  // 'readable',
  // '_events',
  // '_eventsCount',
  // '_maxListeners',
  // 'socket',
  // 'connection',
  // 'httpVersionMajor',
  // 'httpVersionMinor',
  // 'httpVersion',
  // 'complete',
  // 'headers',
  // 'rawHeaders',
  // 'trailers',
  // 'rawTrailers',
  // 'aborted',
  // 'upgrade',
  // 'url',
  // 'method',
  // 'statusCode',
  // 'statusMessage',
  // 'client',
  // '_consuming',
  // '_dumped',
  // 'next',
  // 'baseUrl',
  // 'originalUrl',
  // '_parsedUrl',
  // 'params',
  // 'query',
  // 'res',
  // 'universalCookies',
  // 'i18nextLookupName',
  // 'lng',
  // 'locale',
  // 'language',
  // 'languages',
  // 'i18n',
  // 't',
  // 'body',
  // 'session' ]
  for (let i = 0; i <= 2; i++) {
    console.log(i, args[i].body);
  }
  return websiteMiddleware(...args);
});

app.use(
  '/',
  express.static(__FRONTEND_BUILD_DIR__, {
    maxAge: '180 days'
  })
);

if (__DEV__) {
  app.use('/', express.static(__DLL_BUILD_DIR__, { maxAge: '180 days' }));
  app.use(errorMiddleware);
}

if (module.hot) {
  module.hot.accept(['./middleware/website', './middleware/graphql']);
}

export default app;
