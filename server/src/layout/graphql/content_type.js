import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import {
  addContentType, getContentTypeList, removeContentType, updateContentType,
} from '../dao/content_type';

const ContentType = new GraphQLObjectType({
  name: 'ContentType',
  description: 'Data type for representing various available content types of the layout module.',
  fields: {
    key: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique key',
    },
  },
});

export const ContentTypeQuery = {
  contentTypes: {
    type: GraphQLList(ContentType),
    description: 'List of available content types',
    resolve: async () => getContentTypeList(),
  },
};

export const ContentTypeMutation = {
  addContentType: {
    type: ContentType,
    description: 'Add new content type',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => addContentType(key),
  },

  updateContentType: {
    type: ContentType,
    description: 'Update existing content type',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      newKey: {
        type: GraphQLNonNull(GraphQLString),
        description: 'New key',
      },
    },
    resolve: async (_, { key, newKey }) => updateContentType(key, newKey),
  },

  removeContentType: {
    type: ContentType,
    description: 'Remove content type by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => removeContentType(key),
  },
};
