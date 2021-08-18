import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import getConfig from './config';

/* Queries and mutations */
import { ApplicationPropertyMutation, ApplicationPropertyQuery } from './core/graphql/application_property';
import { ContentTypeMutation, ContentTypeQuery } from './layout/graphql/content_type';
import { SlotMutation, SlotQuery } from './layout/graphql/slot';
import { ContentMutation, ContentQuery } from './layout/graphql/content';
import { TemplateMutation, TemplateQuery } from './layout/graphql/template';
import { ViewMutation, ViewQuery } from './layout/graphql/view';
import { RouteMutation, RouteQuery } from './layout/graphql/route';
import { ProjectMutation, ProjectQuery } from './projects/graphql/project';
import { conditionalMW } from './utils/express-utils';

const GuestQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Guest query type',
  fields: {
    ...ViewQuery,
    ...RouteQuery,
    ...ProjectQuery,
  },
});

const AdminQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Admin query type',
  fields: {
    ...ApplicationPropertyQuery,
    ...ContentTypeQuery,
    ...SlotQuery,
    ...ContentQuery,
    ...TemplateQuery,
    ...ViewQuery,
    ...RouteQuery,
    ...ProjectQuery,
  },
});

const AdminMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Admin mutation type',
  fields: {
    ...ApplicationPropertyMutation,
    ...ContentTypeMutation,
    ...SlotMutation,
    ...ContentMutation,
    ...TemplateMutation,
    ...ViewMutation,
    ...RouteMutation,
    ...ProjectMutation,
  },
});

const router = new Router();
const { graphiql, auth } = getConfig();

const querySchema = new GraphQLSchema({
  query: GuestQueryType,
});

export const adminSchema = new GraphQLSchema({
  query: AdminQueryType,
  mutation: AdminMutationType,
});

router.use('/admin',
  /* TODO: fix this in #12 with proper authentication */
  conditionalMW(!auth.enabled,
    graphqlHTTP({
      graphiql,
      schema: adminSchema,
    })));

router.use('/',
  graphqlHTTP({
    graphiql,
    schema: querySchema,
  }));

export default router;
