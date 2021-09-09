/* GraphQL imports */
import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

/* Authentication service */
import { authenticateUser } from '../services/auth';

/* GraphQL schema references */
import { Redirect } from '../../layout/graphql/redirect';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';

export const Token = new GraphQLObjectType({
  name: 'Token',
  description: 'Authentication token.',
  fields: {
    bearer: {
      type: GraphQLNonNull(GraphQLString),
      description: 'User authentication token',
    },
    redirect: {
      type: Redirect,
      description: 'Route to redirect to after authentication success',
    },
  },
});

const TokenResponse = generateTemplateResponse(Token);

export const TokenQuery = {
  authenticate: {
    type: TokenResponse,
    description: 'Authenticate user',
    args: {
      userID: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user ID',
      },
      password: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Plaintext password',
      },
      referer: {
        type: GraphQLString,
        description: 'Referer route key',
      },
    },
    resolve: async (_, {
      userID, password, referer,
    }) => graphqlWrapper(authenticateUser(userID, password, referer)),
  },
};
