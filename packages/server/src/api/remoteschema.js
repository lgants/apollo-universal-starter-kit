// import { makeExecutableSchema, makeRemoteExecutableSchema } from 'graphql-tools';
// import { introspectSchema } from 'graphql-tools';
//
// import rootSchemaDef from './rootSchema.graphql';
// import modules from '../modules';
// import pubsub from './pubsub';
//
// const executableSchema = makeExecutableSchema({
//   typeDefs: [rootSchemaDef].concat(modules.schemas),
//   resolvers: modules.createResolvers(pubsub)
// });
//
// const schema = makeRemoteExecutableSchema({
//   schema,
//   link
//   // fetcher, you can pass a fetcher instead of a link
// });
//
// export default executableSchema;
import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

const remoteSchemaUri = 'http://localhost:8000/schema.json';

const link = new HttpLink({ uri: remoteSchemaUri, fetch });

export default async () => {
  const schema = await introspectSchema(link);

  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link
  });

  return executableSchema();
};
