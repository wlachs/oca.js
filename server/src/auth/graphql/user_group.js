/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
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
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';

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

const UserGroupResponse = generateTemplateResponse(UserGroup);
const UserGroupResponseList = generateTemplateResponse(GraphQLList(UserGroup));

export const UserGroupQuery = {
  userGroups: {
    type: UserGroupResponseList,
    description: 'List of user groups',
    resolve: async () => graphqlWrapper(getUserGroupList()),
  },

  userGroup: {
    type: UserGroupResponse,
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
    type: UserGroupResponseList,
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
    type: UserGroupResponse,
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
    type: UserGroupResponse,
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
    type: UserGroupResponse,
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
    type: UserGroupResponse,
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
