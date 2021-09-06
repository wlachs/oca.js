import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import {
  addOrUpdateRedirect,
  addRedirect,
  getRedirectByReferer,
  getRedirectList,
  removeRedirect,
  updateRedirect,
} from '../dao/redirect';
import { Route } from './route';

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

export const RedirectQuery = {
  redirects: {
    type: GraphQLList(Redirect),
    description: 'List of redirects',
    resolve: async () => getRedirectList(),
  },

  redirect: {
    type: GraphQLNonNull(Redirect),
    description: 'Get redirect by referer route path',
    args: {
      referer: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Referer route path',
      },
    },
    resolve: async (_, { referer }) => getRedirectByReferer(referer),
  },
};

export const RedirectMutation = {
  addRedirect: {
    type: Redirect,
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
    resolve: async (_, { referer, redirect }) => addRedirect(referer, redirect),
  },

  addOrUpdateRedirect: {
    type: Redirect,
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
    resolve: async (_, { referer, redirect }) => addOrUpdateRedirect(referer, redirect),
  },

  updateRedirect: {
    type: Redirect,
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
    }) => updateRedirect(referer, newReferer, redirect),
  },

  removeRedirect: {
    type: Redirect,
    description: 'Remove redirect by referer',
    args: {
      referer: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Referer route path',
      },
    },
    resolve: async (_, { referer }) => removeRedirect(referer),
  },
};
