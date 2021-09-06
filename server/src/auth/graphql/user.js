import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import {
  addOrUpdateUser, addUser, getUserById, getUserList, removeUser, updateUser,
} from '../dao/user';
import { UserGroup } from './user_group';

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

export const UserQuery = {
  users: {
    type: GraphQLList(User),
    description: 'List of users',
    resolve: async () => getUserList(),
  },

  user: {
    type: GraphQLNonNull(User),
    description: 'Get user by user ID',
    args: {
      userID: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user ID',
      },
    },
    resolve: async (_, { userID }) => getUserById(userID),
  },
};

export const UserMutation = {
  addUser: {
    type: User,
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
    resolve: async (_, { userID, password, groups }) => addUser(userID, password, groups),
  },

  addOrUpdateUser: {
    type: User,
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
    resolve: async (_, { userID, password, groups }) => addOrUpdateUser(userID, password, groups),
  },

  updateUser: {
    type: User,
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
    }) => updateUser(userID, newUserID, password, groups),
  },

  removeUser: {
    type: User,
    description: 'Remove user by ID',
    args: {
      userID: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user ID',
      },
    },
    resolve: async (_, { userID }) => removeUser(userID),
  },
};
