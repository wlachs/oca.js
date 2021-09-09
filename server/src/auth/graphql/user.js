/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

/* DAO references */
import {
  addOrUpdateUser,
  addUser,
  getUserById,
  getUserList,
  removeUser,
  updateUser,
} from '../dao/user';

/* GraphQL schema references */
import { UserGroup } from './user_group';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';

export const User = new GraphQLObjectType({
  name: 'User',
  description: 'Basic system user data type.',
  fields: {
    userID: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique user ID',
    },
    passwordHash: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Password hash',
    },
    groups: {
      type: GraphQLList(UserGroup),
      description: 'Access groups',
    },
  },
});

const UserResponse = generateTemplateResponse(User);
const UserResponseList = generateTemplateResponse(GraphQLList(User));

export const UserQuery = {
  users: {
    type: UserResponseList,
    description: 'List of users',
    resolve: async () => graphqlWrapper(getUserList()),
  },

  user: {
    type: UserResponse,
    description: 'Get user by user ID',
    args: {
      userID: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user ID',
      },
    },
    resolve: async (_, { userID }) => graphqlWrapper(getUserById(userID)),
  },
};

export const UserMutation = {
  addUser: {
    type: UserResponse,
    description: 'Add new user',
    args: {
      userID: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user ID',
      },
      password: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Raw plaintext password',
      },
      groups: {
        type: GraphQLList(GraphQLString),
        description: 'User group list',
      },
    },
    resolve: async (_, {
      userID, password, groups,
    }) => graphqlWrapper(addUser(userID, password, groups), 201),
  },

  addOrUpdateUser: {
    type: UserResponse,
    description: 'Add or update user',
    args: {
      userID: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user ID',
      },
      password: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Raw plaintext password',
      },
      groups: {
        type: GraphQLList(GraphQLString),
        description: 'User group list',
      },
    },
    resolve: async (_, {
      userID, password, groups,
    }) => graphqlWrapper(addOrUpdateUser(userID, password, groups)),
  },

  updateUser: {
    type: UserResponse,
    description: 'Update user',
    args: {
      userID: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user ID',
      },
      newUserID: {
        type: GraphQLString,
        description: 'Optional new unique user ID',
      },
      password: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Raw plaintext password',
      },
      groups: {
        type: GraphQLList(GraphQLString),
        description: 'User group list',
      },
    },
    resolve: async (_, {
      userID, newUserID, password, groups,
    }) => graphqlWrapper(updateUser(userID, newUserID, password, groups)),
  },

  removeUser: {
    type: UserResponse,
    description: 'Remove user by ID',
    args: {
      userID: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user ID',
      },
    },
    resolve: async (_, { userID }) => graphqlWrapper(removeUser(userID)),
  },
};
