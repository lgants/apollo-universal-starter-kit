// import { SchemaLink } from 'apollo-link-schema';
// // import modules from '../../../../modules';
// import { isApiExternal, apiUrl } from '../../../../net';
// import createApolloClient from '../../../../../../common/createApolloClient';
// import CURRENT_USER_QUERY from '../../../../../../client/src/modules/user/graphql/CurrentUserQuery.graphql';
// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
//
// export default async function getCurrentUser(req) {
//   // const schema = require('../../../../api/schema').default;
//   const _schema = require('../../../../api/remoteschema').default;
//   const schema = await _schema;
//
//   // const schemaLink = new SchemaLink({ schema, context: req });
//   console.log('utils getCurrentUser');
//
//   // const client = createApolloClient({
//   //   apiUrl,
//   //   createNetLink: !isApiExternal ? () => schemaLink : undefined
//   // });
//   const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new SchemaLink({ schema })
//   });
//
//   const fuck = await client.query({ query: CURRENT_USER_QUERY });
//   return fuck.data;
// }
