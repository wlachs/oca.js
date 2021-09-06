import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import {
  addOrUpdateUserGroup,
  addUserGroup,
  getUserGroupByKey,
  getUserGroupChain,
  getUserGroupList,
  removeUserGroup,
  updateUserGroup,
} from '../dao/user_group';

const ParentUserGroup = new GraphQLObjectType({
  name: 'ParentUserGroup',
  description: 'Helper user group data type to represent the parent of a group without recursion.',
  fields: {
    key: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique user group key',
    },
  },
});

export const UserGroup = new GraphQLObjectType({
  name: 'UserGroup',
  description: 'User access group data type.',
  fields: {
    key: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique user group key',
    },
    parent: {
      type: ParentUserGroup,
      description: 'Parent user group',
    },
  },
});

export const UserGroupQuery = {
  userGroups: {
    type: GraphQLList(UserGroup),
    description: 'List of user groups',
    resolve: async () => getUserGroupList(),
  },

  userGroup: {
    type: GraphQLNonNull(UserGroup),
    description: 'Get user group by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user group key',
      },
    },
    resolve: async (_, { key }) => getUserGroupByKey(key),
  },

  userGroupChain: {
    type: GraphQLList(UserGroup),
    description: 'Get user group chain to root by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user group key',
      },
    },
    resolve: async (_, { key }) => getUserGroupChain(key),
  },
};

export const UserGroupMutation = {
  addUserGroup: {
    type: UserGroup,
    description: 'Add new user group',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user group key',
      },
      parent: {
        type: GraphQLString,
        description: 'Parent user group key',
      },
    },
    resolve: async (_, { key, parent }) => addUserGroup(key, parent),
  },

  addOrUpdateUserGroup: {
    type: UserGroup,
    description: 'Add or update user group',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user group key',
      },
      parent: {
        type: GraphQLString,
        description: 'Parent user group key',
      },
    },
    resolve: async (_, { key, parent }) => addOrUpdateUserGroup(key, parent),
  },

  updateUserGroup: {
    type: UserGroup,
    description: 'Update user group',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user group key',
      },
      newKey: {
        type: GraphQLString,
        description: 'New user group key',
      },
      parent: {
        type: GraphQLString,
        description: 'Parent user group key',
      },
    },
    resolve: async (_, { key, newKey, parent }) => updateUserGroup(key, newKey, parent),
  },

  removeUserGroup: {
    type: UserGroup,
    description: 'Remove user group by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user group key',
      },
    },
    resolve: async (_, { key }) => removeUserGroup(key),
  },
};
