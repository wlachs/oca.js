import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { authenticateUser } from '../services/auth';
import { Redirect } from './redirect';

export const Token = new GraphQLObjectType({
  name: 'Token',
  description: 'Authentication token.',
  fields: {
    bearer: {
      type: GraphQLNonNull(GraphQLString),
      description: 'User authentication token',
    },
    redirect: {
      type: GraphQLNonNull(Redirect),
      description: 'Route to redirect to after authentication success',
    },
  },
});

export const TokenQuery = {
  authenticate: {
    type: GraphQLNonNull(Token),
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
        type: GraphQLNonNull(GraphQLString),
        description: 'Referer route key',
      },
    },
    resolve: async (_, {
      userID, password, referer,
    }) => authenticateUser(userID, password, referer),
  },
};
