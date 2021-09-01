import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { authenticateUser } from '../services/user';

export const Token = new GraphQLObjectType({
  name: 'Token',
  description: 'Authentication token.',
  fields: {
    value: {
      type: GraphQLNonNull(GraphQLString),
      description: 'User authentication token',
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
    },
    resolve: async (_, { userID, password }) => authenticateUser(userID, password),
  },
};
