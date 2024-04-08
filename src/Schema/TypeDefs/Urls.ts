import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

interface UrlTypeFields {
  longUrl: string;
  shortenedUrl: string;
}

const UrlType: GraphQLObjectType<UrlTypeFields> = new GraphQLObjectType({
  name: 'Urls',
  fields: () => ({
    longUrl: { type: GraphQLString },
    shortenedUrl: { type: GraphQLString }
  })
});

const UrlTypeArray: GraphQLObjectType<UrlTypeFields[]> = new GraphQLObjectType({
  name: 'UrlsArray',
  fields: () => ({
    data: { type: new GraphQLList(UrlType) }
  })
});

const UrlTypeArrayData: GraphQLObjectType<{ data: UrlTypeFields[] }> =
  new GraphQLObjectType({
    name: 'UrlTypeArrayData',
    fields: () => ({
      data: { type: new GraphQLList(UrlType) }
    })
  });

export { UrlType, UrlTypeArray, UrlTypeArrayData };
