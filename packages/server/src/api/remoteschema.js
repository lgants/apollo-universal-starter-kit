import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools';
import fetch from 'node-fetch';
import { BatchHttpLink } from 'apollo-link-batch-http';

const remoteSchemaUri = 'http://localhost:8000/graphql';

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
