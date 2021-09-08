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
  addApplicationProperty, addOrUpdateApplicationProperty,
  getApplicationPropertyByKey,
  getApplicationPropertyList, removeApplicationProperty, updateApplicationProperty,
} from '../dao/application_property';

/* Wrapper */
import graphqlWrapper from './wrapper';

export const ApplicationProperty = new GraphQLObjectType({
  name: 'ApplicationProperty',
  description: 'Core application properties.',
  fields: {
    key: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Key',
    },
    value: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Value',
    },
  },
});

const ApplicationPropertyResponse = new GraphQLObjectType({
  name: 'ApplicationPropertyResponse',
  description: 'Application property response object',
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
      type: ApplicationProperty,
      description: 'Application property',
    },
  },
});

const ApplicationPropertyResponseList = new GraphQLObjectType({
  name: 'ApplicationPropertyResponseList',
  description: 'Application property list response object',
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
      type: GraphQLList(ApplicationProperty),
      description: 'Application property list',
    },
  },
});

export const ApplicationPropertyQuery = {
  applicationProperty: {
    type: GraphQLNonNull(ApplicationPropertyResponse),
    description: 'Get application property by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(getApplicationPropertyByKey(key)),
  },

  applicationProperties: {
    type: ApplicationPropertyResponseList,
    description: 'List of available application properties',
    resolve: async () => graphqlWrapper(getApplicationPropertyList()),
  },
};

export const ApplicationPropertyMutation = {
  addApplicationProperty: {
    type: GraphQLNonNull(ApplicationPropertyResponse),
    description: 'Add new application property',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      value: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Value',
      },
    },
    resolve: async (_, { key, value }) => graphqlWrapper(addApplicationProperty(key, value), 201),
  },

  addOrUpdateApplicationProperty: {
    type: GraphQLNonNull(ApplicationPropertyResponse),
    description: 'Add or update application property',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      value: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Value',
      },
    },
    resolve: async (_, {
      key, value,
    }) => graphqlWrapper(addOrUpdateApplicationProperty(key, value)),
  },

  updateApplicationProperty: {
    type: GraphQLNonNull(ApplicationPropertyResponse),
    description: 'Update existing application property',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      newKey: {
        type: GraphQLString,
        description: 'Optional new key',
      },
      value: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Value',
      },
    },
    resolve: async (_, {
      key, newKey, value,
    }) => graphqlWrapper(updateApplicationProperty(key, newKey, value)),
  },

  removeApplicationProperty: {
    type: GraphQLNonNull(ApplicationPropertyResponse),
    description: 'Remove application property by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(removeApplicationProperty(key)),
  },
};
