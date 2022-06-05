/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

/* DAOs */
import {
  addContentType, addOrIgnoreContentType, getContentTypeList, removeContentType, updateContentType,
} from '../dao/content_type';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';

export const ContentType = new GraphQLObjectType({
  name: 'ContentType',
  description: 'Data type for representing various available content types of the layout module.',
  fields: {
    key: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique key',
    },
  },
});

const ContentTypeResponse = generateTemplateResponse(ContentType);
const ContentTypeResponseList = generateTemplateResponse(GraphQLList(ContentType));

export const ContentTypeQuery = {
  contentTypes: {
    type: ContentTypeResponseList,
    description: 'List of available content types',
    resolve: async () => graphqlWrapper(getContentTypeList()),
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
    },
    resolve: async (_, { key }) => graphqlWrapper(addContentType(key), 201),
  },

  addOrIgnoreContentType: {
    type: ContentTypeResponse,
    description: 'Add new content type or do nothing',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(addOrIgnoreContentType(key)),
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
        /*
        This is marked as non-null because this is the only parameter of the object.
        Change this to optional if the object model has other fields
        */
        type: GraphQLNonNull(GraphQLString),
        description: 'New key',
      },
    },
    resolve: async (_, { key, newKey }) => graphqlWrapper(updateContentType(key, newKey)),
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
    resolve: async (_, { key }) => graphqlWrapper(removeContentType(key)),
  },
};
