/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

/* DAO references */
import {
  addOrUpdateRedirect,
  addRedirect,
  getRedirectByReferer,
  getRedirectList,
  removeRedirect,
  updateRedirect,
} from '../dao/redirect';

/* GraphQL references */
import { Route } from './route';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';

export const Redirect = new GraphQLObjectType({
  name: 'Redirect',
  description: 'Redirection object after successful authentication.',
  fields: {
    referer: {
      type: GraphQLNonNull(Route),
      description: 'Referer route path',
    },
    redirect: {
      type: GraphQLNonNull(Route),
      description: 'Redirect route path',
    },
  },
});

const RedirectResponse = generateTemplateResponse(Redirect);
const RedirectResponseList = generateTemplateResponse(GraphQLList(Redirect));

export const RedirectQuery = {
  redirects: {
    type: GraphQLNonNull(RedirectResponseList),
    description: 'List of redirects',
    resolve: async () => graphqlWrapper(getRedirectList()),
  },

  redirect: {
    type: GraphQLNonNull(RedirectResponse),
    description: 'Get redirect by referer route path',
    args: {
      referer: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Referer route path',
      },
    },
    resolve: async (_, { referer }) => graphqlWrapper(getRedirectByReferer(referer)),
  },
};

export const RedirectMutation = {
  addRedirect: {
    type: GraphQLNonNull(RedirectResponse),
    description: 'Add new redirect',
    args: {
      referer: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Referer route path',
      },
      redirect: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Redirect route path',
      },
    },
    resolve: async (_, {
      referer, redirect,
    }) => graphqlWrapper(addRedirect(referer, redirect), 201),
  },

  addOrUpdateRedirect: {
    type: GraphQLNonNull(RedirectResponse),
    description: 'Add or update redirect',
    args: {
      referer: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Referer route path',
      },
      redirect: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Redirect route path',
      },
    },
    resolve: async (_, {
      referer, redirect,
    }) => graphqlWrapper(addOrUpdateRedirect(referer, redirect)),
  },

  updateRedirect: {
    type: GraphQLNonNull(RedirectResponse),
    description: 'Update redirect',
    args: {
      referer: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Referer route path',
      },
      newReferer: {
        type: GraphQLString,
        description: 'Optional new referer route path',
      },
      redirect: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Redirect route path',
      },
    },
    resolve: async (_, {
      referer, newReferer, redirect,
    }) => graphqlWrapper(updateRedirect(referer, newReferer, redirect)),
  },

  removeRedirect: {
    type: GraphQLNonNull(RedirectResponse),
    description: 'Remove redirect by referer',
    args: {
      referer: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Referer route path',
      },
    },
    resolve: async (_, { referer }) => graphqlWrapper(removeRedirect(referer)),
  },
};
