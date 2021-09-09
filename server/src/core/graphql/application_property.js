/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

/* DAO references */
import {
  addApplicationProperty,
  addOrUpdateApplicationProperty,
  getApplicationPropertyByKey,
  getApplicationPropertyList,
  removeApplicationProperty,
  updateApplicationProperty,
} from '../dao/application_property';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from './wrapper';

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

const ApplicationPropertyResponse = generateTemplateResponse(ApplicationProperty);
const ApplicationPropertyResponseList = generateTemplateResponse(GraphQLList(ApplicationProperty));

export const ApplicationPropertyQuery = {
  applicationProperty: {
    type: ApplicationPropertyResponse,
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
    type: ApplicationPropertyResponse,
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
    type: ApplicationPropertyResponse,
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
    type: ApplicationPropertyResponse,
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
    type: ApplicationPropertyResponse,
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
