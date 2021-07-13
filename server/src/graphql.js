import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import getConfig from './config';

/* Queries and mutations */
import { ContentTypeMutation, ContentTypeQuery } from './layout/graphql/content_type';
import { SlotMutation, SlotQuery } from './layout/graphql/slot';
import { ContentMutation, ContentQuery } from './layout/graphql/content';
import { TemplateMutation, TemplateQuery } from './layout/graphql/template';
import { ViewMutation, ViewQuery } from './layout/graphql/view';

const GuestQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Guest query type',
  fields: {
    ...ViewQuery,
  },
});

const AdminQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Admin query type',
  fields: {
    ...ContentTypeQuery,
    ...SlotQuery,
    ...ContentQuery,
    ...TemplateQuery,
    ...ViewQuery,
  },
});

const AdminMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Admin mutation type',
  fields: {
    ...ContentTypeMutation,
    ...SlotMutation,
    ...ContentMutation,
    ...TemplateMutation,
    ...ViewMutation,
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
