import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools';
import { BatchHttpLink } from 'apollo-link-batch-http';
import fetch from 'node-fetch';
import { apiUrl } from '../net';

const remoteSchemaUri = apiUrl;
const link = new BatchHttpLink({ uri: remoteSchemaUri, fetch });

const generateSchema = async () => {
  const schema = await introspectSchema(link);

  const executableSchema = await makeRemoteExecutableSchema({
    schema,
    link
  });

  return executableSchema;
};

export default generateSchema();
