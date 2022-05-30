/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

/* DAO references */
import {
  addOrUpdateCustom,
  addCustom,
  getCustomByKey,
  getCustomList,
  removeCustomByKey,
  updateCustom,
} from '../dao/custom';

/* GraphQL references */
import { KeyValueInputPair, KeyValueOutputPair } from '../../core/graphql/utils';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';

/* Utils */
import { parseParams, rewritePromise } from '../utils/params';

export const Custom = new GraphQLObjectType({
  name: 'Custom',
  description: 'Data type for representing custom objects.',
  fields: {
    key: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique ID',
    },
    params: {
      type: GraphQLList(KeyValueOutputPair),
      description: 'Optional list of custom params',
    },
  },
});

const CustomResponse = generateTemplateResponse(Custom);
const CustomResponseList = generateTemplateResponse(GraphQLList(Custom));

export const CustomQuery = {
  customList: {
    type: CustomResponseList,
    description: 'List of custom objects',
    args: {
      modelKey: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Model key of custom object',
      },
    },
    resolve: async (_, { modelKey }) => graphqlWrapper(rewritePromise(getCustomList(modelKey))),
  },

  custom: {
    type: CustomResponse,
    description: 'Get project by key',
    args: {
      modelKey: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Model key of custom object',
      },
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique ID',
      },
    },
    resolve: async (_, { modelKey, key }) => graphqlWrapper(getCustomByKey(modelKey, key)),
  },
};

export const CustomMutation = {
  addCustom: {
    type: CustomResponse,
    description: 'Add custom object',
    args: {
      modelKey: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Model key of custom object',
      },
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique ID',
      },
      params: {
        type: GraphQLList(KeyValueInputPair),
        description: 'Custom param map',
      },
    },
    resolve: async (_, {
      modelKey, key, params,
    }) => graphqlWrapper(addCustom(modelKey, key, parseParams(params)), 201),
  },

  updateCustom: {
    type: CustomResponse,
    description: 'Update existing custom object',
    args: {
      modelKey: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Model key of custom object',
      },
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique ID',
      },
      newKey: {
        type: GraphQLNonNull(GraphQLString),
        description: 'New unique ID',
      },
      params: {
        type: GraphQLList(KeyValueInputPair),
        description: 'Custom param map',
      },
    },
    resolve: async (_, {
      modelKey, key, newKey, params,
    }) => graphqlWrapper(updateCustom(modelKey, key, newKey, parseParams(params))),
  },

  addOrUpdateCustom: {
    type: CustomResponse,
    description: 'Add or update existing custom object',
    args: {
      modelKey: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Model key of custom object',
      },
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique ID',
      },
      params: {
        type: GraphQLList(KeyValueInputPair),
        description: 'Custom param map',
      },
    },
    resolve: async (_, {
      modelKey, key, params,
    }) => graphqlWrapper(addOrUpdateCustom(modelKey, key, parseParams(params))),
  },

  removeCustomByKey: {
    type: CustomResponse,
    description: 'Remove custom object by key',
    args: {
      modelKey: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Model key of custom object',
      },
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique ID',
      },
    },
    resolve: async (_, { modelKey, key }) => graphqlWrapper(removeCustomByKey(modelKey, key)),
  },
};
