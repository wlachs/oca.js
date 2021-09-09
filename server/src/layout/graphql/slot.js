/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

/* DAO references */
import {
  addOrUpdateSlot,
  addSlot,
  getSlotByKey,
  getSlotList,
  getSlotListForContentType,
  removeSlot,
  updateSlot,
} from '../dao/slot';

/* GraphQL references */
import { ContentType } from './content_type';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';

export const Slot = new GraphQLObjectType({
  name: 'Slot',
  description: 'Data type for representing content slots of the layout module.',
  fields: {
    key: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique key',
    },
    allowedContentTypes: {
      type: GraphQLList(ContentType),
      description: 'List of allowed content types in the slot',
    },
  },
});

const SlotResponse = generateTemplateResponse(Slot);
const SlotResponseList = generateTemplateResponse(GraphQLList(Slot));

export const SlotQuery = {
  slots: {
    type: SlotResponseList,
    description: 'List of slots',
    resolve: async () => graphqlWrapper(getSlotList()),
  },

  slot: {
    type: SlotResponse,
    description: 'Get slot by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(getSlotByKey(key)),
  },

  slotByContentType: {
    type: SlotResponse,
    description: 'Get slot by content type',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Content type key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(getSlotListForContentType(key)),
  },
};

export const SlotMutation = {
  addSlot: {
    type: SlotResponse,
    description: 'Add new slot',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      contentTypes: {
        type: GraphQLList(GraphQLString),
        description: 'Allowed content types',
      },
    },
    resolve: async (_, { key, contentTypes }) => graphqlWrapper(addSlot(key, contentTypes), 201),
  },

  addOrUpdateSlot: {
    type: SlotResponse,
    description: 'Add or update slot',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      contentTypes: {
        type: GraphQLList(GraphQLString),
        description: 'Allowed content types',
      },
    },
    resolve: async (_, { key, contentTypes }) => graphqlWrapper(addOrUpdateSlot(key, contentTypes)),
  },

  updateSlot: {
    type: SlotResponse,
    description: 'Update slot',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      newKey: {
        type: GraphQLString,
        description: 'New key',
      },
      contentTypes: {
        type: GraphQLList(GraphQLString),
        description: 'Allowed content types',
      },
    },
    resolve: async (_, {
      key, newKey, contentTypes,
    }) => graphqlWrapper(updateSlot(key, newKey, contentTypes)),
  },

  removeSlot: {
    type: SlotResponse,
    description: 'Remove slot',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(removeSlot(key)),
  },
};
