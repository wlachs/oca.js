import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import jwt from 'express-jwt';

/* Queries and mutations */
import { ApplicationPropertyMutation, ApplicationPropertyQuery } from './core/graphql/application_property';
import { ContentTypeMutation, ContentTypeQuery } from './layout/graphql/content_type';
import { SlotMutation, SlotQuery } from './layout/graphql/slot';
import { ContentMutation, ContentQuery } from './layout/graphql/content';
import { TemplateMutation, TemplateQuery } from './layout/graphql/template';
import { ViewMutation, ViewQuery } from './layout/graphql/view';
import { RouteMutation, RouteQuery } from './layout/graphql/route';
import { ProjectMutation, ProjectQuery } from './projects/graphql/project';
import { UserMutation, UserQuery } from './auth/graphql/user';
import { UserGroupMutation, UserGroupQuery } from './auth/graphql/user_group';
import { TokenQuery } from './auth/graphql/token';
import { RedirectMutation, RedirectQuery } from './layout/graphql/redirect';

/* Misc */
import { asyncMW, conditionalMW } from './utils/express-utils';
import getConfig from './config';
import { JWT_ALGORITHM, JWT_SECRET } from './config/secrets';

/* Middleware */
import { populateUserGroupsMW, fakePopulateAdminUserMW } from './auth/middleware/populateUserGroupsMW';

const GuestQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Guest query type',
  fields: {
    ...ViewQuery,
    ...RouteQuery,
    ...ProjectQuery,
    ...TokenQuery,
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
    ...UserQuery,
    ...UserGroupQuery,
    ...RedirectQuery,
    ...TokenQuery,
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
    ...UserMutation,
    ...UserGroupMutation,
    ...RedirectMutation,
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
  [
    conditionalMW(auth.enabled,
      jwt({
        secret: JWT_SECRET,
        algorithms: [JWT_ALGORITHM],
      }),
      /* If authentication is turned off, inject admin user into the request */
      asyncMW(fakePopulateAdminUserMW)),

    asyncMW(populateUserGroupsMW),

    graphqlHTTP({
      graphiql,
      schema: adminSchema,
    }),
  ]);

router.use('/',
  [
    asyncMW(populateUserGroupsMW),

    graphqlHTTP({
      graphiql,
      schema: querySchema,
    }),
  ]);

export default router;
