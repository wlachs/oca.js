/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';
import {
  resolveAddContentType,
  resolveAddOrIgnoreContentType,
  resolveContentTypeByKey,
  resolveContentTypeList, resolveRemoveContentType, resolveUpdateContentType,
} from './resolvers/content_type';

export const ContentType = new GraphQLObjectType({
  name: 'ContentType',
  description: 'Data type for representing various available content types of the layout module.',
  fields: {
    key: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique key',
    },
    chain: {
      type: GraphQLList(GraphQLString),
      description: 'Content type chain',
    },
  },
});

const ContentTypeResponse = generateTemplateResponse(ContentType);
const ContentTypeResponseList = generateTemplateResponse(GraphQLList(ContentType));

export const ContentTypeQuery = {
  contentType: {
    type: ContentTypeResponse,
    description: 'Get details of a content type',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(resolveContentTypeByKey(key)),
  },
  contentTypes: {
    type: ContentTypeResponseList,
    description: 'List of available content types',
    resolve: async () => graphqlWrapper(resolveContentTypeList()),
  },
};

export const ContentTypeMutation = {
  addContentType: {
    type: ContentTypeResponse,
    description: 'Add new content type',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      parentKey: {
        type: GraphQLString,
        description: 'Parent key if available',
      },
    },
    resolve: async (_, {
      key, parentKey,
    }) => graphqlWrapper(resolveAddContentType(key, parentKey), 201),
  },

  addOrIgnoreContentType: {
    type: ContentTypeResponse,
    description: 'Add new content type or do nothing',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
      parentKey: {
        type: GraphQLString,
        description: 'Parent key if available',
      },
    },
    resolve: async (_, {
      key, parentKey,
    }) => graphqlWrapper(resolveAddOrIgnoreContentType(key, parentKey)),
  },

  updateContentType: {
    type: ContentTypeResponse,
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
      parentKey: {
        type: GraphQLString,
        description: 'Parent key if available',
      },
    },
    resolve: async (_, {
      key, newKey, parentKey,
    }) => graphqlWrapper(resolveUpdateContentType(key, newKey, parentKey)),
  },

  removeContentType: {
    type: ContentTypeResponse,
    description: 'Remove content type by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(resolveRemoveContentType(key)),
  },
};
