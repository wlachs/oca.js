import {
  GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString,
} from 'graphql';

export const KeyValueInputPair = new GraphQLInputObjectType({
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

export const KeyValueOutputPair = new GraphQLObjectType({
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
