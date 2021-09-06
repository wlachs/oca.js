import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import { Slot } from './slot';
import {
  addOrUpdateTemplate,
  addTemplate,
  getTemplateByKey,
  getTemplateBySlot,
  getTemplateList,
  removeTemplate,
  updateTemplate,
} from '../dao/template';

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

export const TemplateQuery = {
  templates: {
    type: GraphQLList(Template),
    description: 'List of templates',
    resolve: async () => getTemplateList(),
  },

  template: {
    type: GraphQLNonNull(Template),
    description: 'Get template by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => getTemplateByKey(key),
  },

  templateBySlot: {
    type: GraphQLList(Template),
    description: 'Get template for slot',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => getTemplateBySlot(key),
  },
};

export const TemplateMutation = {
  addTemplate: {
    type: Template,
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
    resolve: async (_, { key, slots }) => addTemplate(key, slots),
  },

  addOrUpdateTemplate: {
    type: Template,
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
    resolve: async (_, { key, slots }) => addOrUpdateTemplate(key, slots),
  },

  updateTemplate: {
    type: Template,
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
    resolve: async (_, { key, newKey, slots }) => updateTemplate(key, newKey, slots),
  },

  removeTemplate: {
    type: Template,
    description: 'Remove template by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => removeTemplate(key),
  },
};
