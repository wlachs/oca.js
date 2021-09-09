/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

/* DAO references */
import {
  addOrUpdateView,
  addView,
  getViewByKey,
  getViewByTemplate,
  getViewList,
  removeView,
  updateView,
} from '../dao/view';

/* GraphQL references */
import { Template } from './template';
import { Slot } from './slot';
import { Content } from './content';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';

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

const ViewResponse = generateTemplateResponse(View);
const ViewResponseList = generateTemplateResponse(GraphQLList(View));

export const ViewQuery = {
  views: {
    type: ViewResponseList,
    description: 'List of available views',
    resolve: async () => graphqlWrapper(getViewList()),
  },

  view: {
    type: ViewResponse,
    description: 'Get view by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(getViewByKey(key)),
  },

  viewByTemplate: {
    type: ViewResponseList,
    description: 'Get view by template',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(getViewByTemplate(key)),
  },
};

export const ViewMutation = {
  addView: {
    type: ViewResponse,
    description: 'Add view',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
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
      key, template, content, pageTitle,
    }) => graphqlWrapper(addView(key, template, content, pageTitle), 201),
  },

  updateView: {
    type: ViewResponse,
    description: 'Update update view',
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
      key, newKey, template, content, pageTitle,
    }) => graphqlWrapper(updateView(key, newKey, template, content, pageTitle)),
  },

  addOrUpdateView: {
    type: ViewResponse,
    description: 'Add or update view',
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
      key, newKey, template, content, pageTitle,
    }) => graphqlWrapper(addOrUpdateView(key, newKey, template, content, pageTitle)),
  },

  removeView: {
    type: ViewResponse,
    description: 'Remove view by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(removeView(key)),
  },
};
