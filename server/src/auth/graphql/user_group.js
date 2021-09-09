/* GraphQL imports */
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

/* DAO references */
import {
  addOrUpdateUserGroup,
  addUserGroup,
  getUserGroupByKey,
  getUserGroupChain,
  getUserGroupList,
  removeUserGroup,
  updateUserGroup,
} from '../dao/user_group';

/* Wrapper */
import { graphqlWrapper } from '../../core/graphql/wrapper';

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

const UserGroupResponse = new GraphQLObjectType({
  name: 'UserGroupResponse',
  description: 'User Group response object',
  fields: {
    message: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Response message',
    },
    statusCode: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'Response status',
    },
    node: {
      type: UserGroup,
      description: 'User group',
    },
  },
});

const UserGroupResponseList = new GraphQLObjectType({
  name: 'UserGroupResponseList',
  description: 'User Group list response object',
  fields: {
    message: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Response message',
    },
    statusCode: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'Response status',
    },
    node: {
      type: GraphQLList(UserGroup),
      description: 'User group list',
    },
  },
});

export const UserGroupQuery = {
  userGroups: {
    type: GraphQLNonNull(UserGroupResponseList),
    description: 'List of user groups',
    resolve: async () => graphqlWrapper(getUserGroupList()),
  },

  userGroup: {
    type: GraphQLNonNull(UserGroupResponse),
    description: 'Get user group by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user group key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(getUserGroupByKey(key)),
  },

  userGroupChain: {
    type: GraphQLNonNull(UserGroupResponseList),
    description: 'Get user group chain to root by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user group key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(getUserGroupChain(key)),
  },
};

export const UserGroupMutation = {
  addUserGroup: {
    type: GraphQLNonNull(UserGroupResponse),
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
    resolve: async (_, { key, parent }) => graphqlWrapper(addUserGroup(key, parent), 201),
  },

  addOrUpdateUserGroup: {
    type: GraphQLNonNull(UserGroupResponse),
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
    resolve: async (_, { key, parent }) => graphqlWrapper(addOrUpdateUserGroup(key, parent)),
  },

  updateUserGroup: {
    type: GraphQLNonNull(UserGroupResponse),
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
    resolve: async (_, {
      key, newKey, parent,
    }) => graphqlWrapper(updateUserGroup(key, newKey, parent)),
  },

  removeUserGroup: {
    type: GraphQLNonNull(UserGroupResponse),
    description: 'Remove user group by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique user group key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(removeUserGroup(key)),
  },
};
