/* GraphQL imports */
import {
  GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString,
} from 'graphql';
import executeMapping from '../../custom/mapping';

export async function graphqlWrapper(promise, SUCCESS = 200) {
  try {
    const node = await promise;
    return {
      message: 'OK',
      statusCode: SUCCESS,
      node,
    };
  } catch (e) {
    return {
      message: e.message,
      statusCode: e.statusCode || 500,
    };
  }
}

function resolveTypeString(inputString) {
  const outputString = inputString.toString().replace(/\[(.*)]/, 'ListOf$1');
  if (inputString === outputString) {
    return inputString;
  }
  return resolveTypeString(outputString);
}

export function generateTemplateResponse(ofType) {
  const typeString = resolveTypeString(ofType);
  const generatedType = new GraphQLObjectType({
    name: `Generated${typeString}Response`,
    description: 'Slot response object',
    fields: {
      message: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Response status',
      },
      statusCode: {
        type: GraphQLNonNull(GraphQLInt),
        description: 'Response status',
      },
      node: {
        type: ofType,
        description: typeString,
      },
    },
  });

  return GraphQLNonNull(generatedType);
}

export async function mapToAttributes(source) {
  if (source.componentMapper) {
    return executeMapping(source);
  }
  return source.attributes;
}
