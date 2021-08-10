import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import {
  addApplicationProperty,
  getApplicationPropertyByKey,
  getApplicationPropertyList, removeApplicationProperty, updateApplicationProperty,
} from '../dao/application_property';

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

export const ApplicationPropertyQuery = {
  applicationProperty: {
    type: GraphQLNonNull(ApplicationProperty),
    description: 'Get application property by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => getApplicationPropertyByKey(key),
  },
  applicationProperties: {
    type: GraphQLList(ApplicationProperty),
    description: 'List of available application properties',
    resolve: async () => getApplicationPropertyList(),
  },
};

export const ApplicationPropertyMutation = {
  addApplicationProperty: {
    type: ApplicationProperty,
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
    resolve: async (_, { key, value }) => addApplicationProperty(key, value),
  },

  updateApplicationProperty: {
    type: ApplicationProperty,
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
    resolve: async (_, { key, newKey, value }) => updateApplicationProperty(key, newKey, value),
  },

  removeApplicationProperty: {
    type: ApplicationProperty,
    description: 'Remove application property by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => removeApplicationProperty(key),
  },
};
