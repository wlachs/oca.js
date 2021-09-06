import {
  GraphQLObjectType, GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import { ContentType } from './content_type';
import {
  addContent,
  addOrUpdateContent,
  getContentByKey,
  getContentByType,
  getContentList,
  removeContent,
  updateContent,
} from '../dao/content';

const KeyValueInputPair = new GraphQLInputObjectType({
  name: 'InputStringPair',
  description: 'Key-Value pair of strings',
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

const KeyValueOutputPair = new GraphQLObjectType({
  name: 'OutputStringPair',
  description: 'Key-Value pair of strings',
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

export const Content = new GraphQLObjectType({
  name: 'Content',
  description: 'Data type for representing content of the layout module.',
  fields: {
    key: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique key',
    },
    type: {
      type: GraphQLNonNull(ContentType),
      description: 'Type of the content',
    },
    attributes: {
      type: GraphQLList(KeyValueOutputPair),
      description: 'Optional list of content attributes',
    },
  },
});

export const ContentQuery = {
  contents: {
    type: GraphQLList(Content),
    description: 'List of available contents',
    resolve: async () => getContentList(),
  },

  content: {
    type: GraphQLNonNull(Content),
    description: 'Get content by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => getContentByKey(key),
  },

  contentByType: {
    type: GraphQLList(Content),
    description: 'Get content for content type',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => getContentByType(key),
  },
};

export const ContentMutation = {
  addContent: {
    type: Content,
    description: 'Add new content',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      type: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Content type key',
      },
      attributes: {
        type: GraphQLList(KeyValueInputPair),
        description: 'Optional attributes',
      },
    },
    resolve: async (_, { key, type, attributes }) => addContent(key, type, attributes),
  },

  addOrUpdateContent: {
    type: Content,
    description: 'Add or update content',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      type: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Content type key',
      },
      attributes: {
        type: GraphQLList(KeyValueInputPair),
        description: 'Optional attributes',
      },
    },
    resolve: async (_, { key, type, attributes }) => addOrUpdateContent(key, type, attributes),
  },

  updateContent: {
    type: Content,
    description: 'Update existing content',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      newKey: {
        type: GraphQLString,
        description: 'New key',
      },
      type: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Content type key',
      },
      attributes: {
        type: GraphQLList(KeyValueInputPair),
        description: 'Optional attributes',
      },
    },
    resolve: async (_, {
      key, newKey, type, attributes,
    }) => updateContent(key, newKey, type, attributes),
  },

  removeContent: {
    type: Content,
    description: 'Remove content by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => removeContent(key),
  },
};
