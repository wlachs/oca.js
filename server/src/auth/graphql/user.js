import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import {
  addOrUpdateUser, addUser, getUserById, getUserList, removeUser, updateUser,
} from '../dao/user';

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
    },
    resolve: async (_, { userID, password }) => addUser(userID, password),
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
    },
    resolve: async (_, { userID, password }) => addOrUpdateUser(userID, password),
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
    },
    resolve: async (_, { userID, newUserID, password }) => updateUser(userID, newUserID, password),
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
