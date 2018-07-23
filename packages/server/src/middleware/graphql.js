import { graphqlExpress } from 'apollo-server-express';
import { formatResponse } from 'apollo-logger';
import 'isomorphic-fetch';

import schema from '../api/remoteschema';
// import schema from '../api/schema';
import modules from '../modules';
import settings from '../../../../settings';
import log from '../../../common/log';

export default async (req, res, next) => {
  try {
    const context = await modules.createContext(req, res);
    const x = await schema;
    console.log('_schema', x);

    const _schema = await schema;

    graphqlExpress(() => ({
      schema: _schema,
      context: { ...context, req, res },
      debug: false,
      formatError: error => {
        console.log('it errored');
        log.error('GraphQL execution error:', error);
        return error;
      },
      formatResponse: (response, options) =>
        settings.app.logging.apolloLogging
          ? formatResponse({ logger: log.debug.bind(log) }, response, options)
          : response,
      tracing: !!settings.engine.engineConfig.apiKey,
      cacheControl: !!settings.engine.engineConfig.apiKey
    }))(req, res, next);
  } catch (e) {
    // If createContext decided to finish response, don't pass error downwards
    if (!res.headersSent) {
      next(e);
    }
  }
};
