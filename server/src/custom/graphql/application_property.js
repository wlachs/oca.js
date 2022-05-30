/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

/* DAO references */
import {
  addCustom, addOrUpdateCustom, getCustomByKey, getCustomList, removeCustomByKey, updateCustom,
} from '../dao/custom';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';

/* Model key */
import { APPLICATION_PROPERTY_MODEL_KEY } from '../db/schema/application_property';

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
    resolve: async (_, {
      key,
    }) => graphqlWrapper(getCustomByKey(APPLICATION_PROPERTY_MODEL_KEY, key)),
  },

  applicationProperties: {
    type: ApplicationPropertyResponseList,
    description: 'List of available application properties',
    resolve: async () => graphqlWrapper(getCustomList(APPLICATION_PROPERTY_MODEL_KEY)),
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
    resolve: async (_, {
      key, value,
    }) => graphqlWrapper(addCustom(APPLICATION_PROPERTY_MODEL_KEY, key, { value }), 201),
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
    }) => graphqlWrapper(addOrUpdateCustom(APPLICATION_PROPERTY_MODEL_KEY, key, { value })),
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
    }) => graphqlWrapper(updateCustom(APPLICATION_PROPERTY_MODEL_KEY, key, newKey, { value })),
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
    resolve: async (_, {
      key,
    }) => graphqlWrapper(removeCustomByKey(APPLICATION_PROPERTY_MODEL_KEY, key)),
  },
};
