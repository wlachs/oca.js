/* GraphQL */
import { GraphQLSchema, GraphQLObjectType } from 'graphql';

/* Queries and mutations */
import { ApplicationPropertyMutation, ApplicationPropertyQuery } from '../custom/graphql/application_property';
import { ContentTypeMutation, ContentTypeQuery } from '../layout/graphql/content_type';
import { SlotMutation, SlotQuery } from '../layout/graphql/slot';
import { ContentMutation, ContentQuery } from '../layout/graphql/content';
import { TemplateMutation, TemplateQuery } from '../layout/graphql/template';
import { ViewMutation, ViewQuery } from '../layout/graphql/view';
import { RouteMutation, RouteQuery } from '../layout/graphql/route';
import { CustomMutation, CustomQuery } from '../custom/graphql/custom';
import { UserMutation, UserQuery } from '../auth/graphql/user';
import { UserGroupMutation, UserGroupQuery } from '../auth/graphql/user_group';
import { TokenQuery } from '../auth/graphql/token';
import { RedirectMutation, RedirectQuery } from '../layout/graphql/redirect';

const GuestQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Guest query type',
  fields: {
    ...RouteQuery,
    ...CustomQuery,
    ...TokenQuery,
  },
});

const RestrictedQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Restricted query type',
  fields: {
    ...ViewQuery,
    ...RouteQuery,
    ...CustomQuery,
    ...TokenQuery,
  },
});

const RestrictedMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Restricted mutation type',
  fields: {
    ...CustomMutation,
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
    ...CustomQuery,
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
    ...CustomMutation,
    ...UserMutation,
    ...UserGroupMutation,
    ...RedirectMutation,
  },
});

export const guestSchema = new GraphQLSchema({
  query: GuestQueryType,
});

export const restrictedSchema = new GraphQLSchema({
  query: RestrictedQueryType,
  mutation: RestrictedMutationType,
});

export const adminSchema = new GraphQLSchema({
  query: AdminQueryType,
  mutation: AdminMutationType,
});
