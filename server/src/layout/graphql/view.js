import {
  GraphQLObjectType, GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import { Template } from './template';
import { Slot } from './slot';
import { Content } from './content';
import {
  addOrUpdateView,
  getViewByKey,
  getViewByTemplate,
  getViewList,
  removeView,
  updateView,
} from '../dao/view';

const SlotContentInputPair = new GraphQLInputObjectType({
  name: 'InputSlotContentPair',
  description: 'Slot->Content pair for views',
  fields: {
    slot: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Slot key',
    },
    content: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Content key',
    },
  },
});

const SlotContentOutputPair = new GraphQLObjectType({
  name: 'OutputSlotContentPair',
  description: 'Slot->Content pair for views',
  fields: {
    slot: {
      type: GraphQLNonNull(Slot),
      description: 'Slot',
    },
    content: {
      type: GraphQLNonNull(Content),
      description: 'Content key',
    },
  },
});

export const View = new GraphQLObjectType({
  name: 'View',
  description: 'Data type for representing a view of the layout module.',
  fields: {
    key: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique key',
    },
    template: {
      type: GraphQLNonNull(Template),
      description: 'Template of the view',
    },
    content: {
      type: GraphQLList(SlotContentOutputPair),
      description: 'List of slot->content associations',
    },
    pageTitle: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Page title to show in the client',
    },
  },
});

export const ViewQuery = {
  views: {
    type: GraphQLList(View),
    description: 'List of available views',
    resolve: async () => getViewList(),
  },

  view: {
    type: GraphQLNonNull(View),
    description: 'Get view by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => getViewByKey(key),
  },

  viewByTemplate: {
    type: GraphQLList(View),
    description: 'Get view by template',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => getViewByTemplate(key),
  },
};

export const ViewMutation = {
  addOrUpdateView: {
    type: View,
    description: 'Add or update view',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      template: {
        type: GraphQLString,
        description: 'Template key',
      },
      content: {
        type: GraphQLList(SlotContentInputPair),
        description: 'Slot->Content key associations',
      },
      pageTitle: {
        type: GraphQLString,
        description: 'Page title to show in the client',
      },
    },
    resolve: async (_, {
      key, template, content, pageTitle,
    }) => addOrUpdateView(key, template, content, pageTitle),
  },

  updateView: {
    type: View,
    description: 'Update view',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      newKey: {
        type: GraphQLString,
        description: 'New key',
      },
      template: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Template key',
      },
      content: {
        type: GraphQLList(SlotContentInputPair),
        description: 'Slot->Content key associations',
      },
      pageTitle: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Page title to show in the client',
      },
    },
    resolve: async (_, {
      key, newKey, template, content, pageTitle,
    }) => updateView(key, newKey, template, content, pageTitle),
  },

  removeView: {
    type: View,
    description: 'Remove view by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => removeView(key),
  },
};
