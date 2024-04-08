import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import {
  GET_URLS_LIST,
  GET_DATA_BY_SHORTENED_URL,
  CREATE_RECORD_BY_LONG_URL,
  REDIRECT_BY_SHORTENED_URL
} from './Queries/UrlQueries';

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllUrls: GET_URLS_LIST,
    getDataByShortenedUrl: GET_DATA_BY_SHORTENED_URL,
    createRecord: CREATE_RECORD_BY_LONG_URL,
    redirectReq: REDIRECT_BY_SHORTENED_URL
  }
});

export const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQuery
});
