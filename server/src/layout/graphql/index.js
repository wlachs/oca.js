import { GraphQLObjectType } from 'graphql';
import { ContentTypeMutation, ContentTypeQuery } from './content_type';

export const GuestQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Guest query type',
  fields: {
    /* TODO: ViewQuery */
  },
});

export const AdminQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Admin query type',
  fields: {
    ...ContentTypeQuery,
  },
});

export const AdminMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Admin mutation type',
  fields: {
    ...ContentTypeMutation,
  },
});
