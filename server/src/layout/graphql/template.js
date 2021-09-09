/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

/* DAO references */
import {
  addOrUpdateTemplate,
  addTemplate,
  getTemplateByKey,
  getTemplateBySlot,
  getTemplateList,
  removeTemplate,
  updateTemplate,
} from '../dao/template';

/* GraphQL references */
import { Slot } from './slot';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';

export const Template = new GraphQLObjectType({
  name: 'Template',
  description: 'Data type for representing templates of the layout module.',
  fields: {
    key: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique key',
    },
    slots: {
      type: GraphQLList(Slot),
      description: 'List of content slots',
    },
  },
});

const TemplateResponse = generateTemplateResponse(Template);
const TemplateResponseList = generateTemplateResponse(GraphQLList(Template));

export const TemplateQuery = {
  templates: {
    type: TemplateResponseList,
    description: 'List of templates',
    resolve: async () => graphqlWrapper(getTemplateList()),
  },

  template: {
    type: TemplateResponse,
    description: 'Get template by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(getTemplateByKey(key)),
  },

  templateBySlot: {
    type: TemplateResponse,
    description: 'Get template for slot',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(getTemplateBySlot(key)),
  },
};

export const TemplateMutation = {
  addTemplate: {
    type: TemplateResponse,
    description: 'Add new template',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      slots: {
        type: GraphQLList(GraphQLString),
        description: 'List of template slots',
      },
    },
    resolve: async (_, { key, slots }) => graphqlWrapper(addTemplate(key, slots), 201),
  },

  addOrUpdateTemplate: {
    type: TemplateResponse,
    description: 'Add or update template',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      slots: {
        type: GraphQLList(GraphQLString),
        description: 'List of template slots',
      },
    },
    resolve: async (_, { key, slots }) => graphqlWrapper(addOrUpdateTemplate(key, slots)),
  },

  updateTemplate: {
    type: TemplateResponse,
    description: 'Update existing template',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      newKey: {
        type: GraphQLString,
        description: 'New key',
      },
      slots: {
        type: GraphQLList(GraphQLString),
        description: 'List of template slots',
      },
    },
    resolve: async (_, {
      key, newKey, slots,
    }) => graphqlWrapper(updateTemplate(key, newKey, slots)),
  },

  removeTemplate: {
    type: TemplateResponse,
    description: 'Remove template by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(removeTemplate(key)),
  },
};
