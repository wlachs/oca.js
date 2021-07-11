import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import { ContentType } from './content_type';
import {
  addSlot, getSlotByKey, getSlotList, getSlotListForContentType, removeSlot, updateSlot,
} from '../dao/slot';

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

export const SlotQuery = {
  slots: {
    type: GraphQLList(Slot),
    description: 'List of slots',
    resolve: async () => getSlotList(),
  },

  slot: {
    type: GraphQLNonNull(Slot),
    description: 'Get slot by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => getSlotByKey(key),
  },

  slotByContentType: {
    type: GraphQLList(Slot),
    description: 'Get slot by content type',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Content type key',
      },
    },
    resolve: async (_, { key }) => getSlotListForContentType(key),
  },
};

export const SlotMutation = {
  addSlot: {
    type: Slot,
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
    resolve: async (_, { key, contentTypes }) => addSlot(key, contentTypes),
  },

  updateSlot: {
    type: Slot,
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
    resolve: async (_, { key, newKey, contentTypes }) => updateSlot(key, newKey, contentTypes),
  },

  removeSlot: {
    type: Slot,
    description: 'Remove slot',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => removeSlot(key),
  },
};
