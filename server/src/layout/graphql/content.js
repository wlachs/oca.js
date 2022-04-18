/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

/* DAO references */
import {
  addContent,
  addOrUpdateContent,
  getContentByKey,
  getContentByType,
  getContentList,
  removeContent,
  updateContent,
} from '../dao/content';

/* GraphQL references */
import { KeyValueInputPair, KeyValueOutputPair } from '../../core/graphql/utils';
import { ContentType } from './content_type';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';

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

const ContentResponse = generateTemplateResponse(Content);
const ContentResponseList = generateTemplateResponse(GraphQLList(Content));

export const ContentQuery = {
  contents: {
    type: ContentResponseList,
    description: 'List of available contents',
    resolve: async () => graphqlWrapper(getContentList()),
  },

  content: {
    type: ContentResponse,
    description: 'Get content by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(getContentByKey(key)),
  },

  contentByType: {
    type: ContentResponseList,
    description: 'Get content for content type',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(getContentByType(key)),
  },
};

export const ContentMutation = {
  addContent: {
    type: ContentResponse,
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
    resolve: async (_, {
      key, type, attributes,
    }) => graphqlWrapper(addContent(key, type, attributes), 201),
  },

  addOrUpdateContent: {
    type: ContentResponse,
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
    resolve: async (_, {
      key, type, attributes,
    }) => graphqlWrapper(addOrUpdateContent(key, type, attributes)),
  },

  updateContent: {
    type: ContentResponse,
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
    }) => graphqlWrapper(updateContent(key, newKey, type, attributes)),
  },

  removeContent: {
    type: ContentResponse,
    description: 'Remove content by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(removeContent(key)),
  },
};
