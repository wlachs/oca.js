import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { ContentTypeMutation, ContentTypeQuery } from './layout/graphql/content_type';
import { SlotMutation, SlotQuery } from './layout/graphql/slot';
import getConfig from './config';

const GuestQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Guest query type',
  fields: {
    /* TODO: ViewQuery */
  },
});

const AdminQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Admin query type',
  fields: {
    ...ContentTypeQuery,
    ...SlotQuery,
  },
});

const AdminMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Admin mutation type',
  fields: {
    ...ContentTypeMutation,
    ...SlotMutation,
  },
});

const router = new Router();
const { graphiql } = getConfig();

const querySchema = new GraphQLSchema({
  query: GuestQueryType,
});

const adminSchema = new GraphQLSchema({
  query: AdminQueryType,
  mutation: AdminMutationType,
});

router.use('/admin',
  graphqlHTTP({
    graphiql,
    schema: adminSchema,
  }));

router.use('/',
  graphqlHTTP({
    graphiql,
    schema: querySchema,
  }));

export default router;
