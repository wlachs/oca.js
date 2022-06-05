/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

/* DAO references */
import {
  addOrUpdateRoute,
  addRoute,
  getRouteByPathOrDefault,
  getRouteByView,
  getRouteList,
  removeRoute,
  updateRoute,
} from '../dao/route';

/* GraphQL references */
import { View } from './view';
import { UserGroup } from '../../auth/graphql/user_group';

/* Services */
import { getDefaultRoute } from '../services/route';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';

export const Route = new GraphQLObjectType({
  name: 'Route',
  description: 'Data type for representing routes of the layout module.',
  fields: {
    path: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique path',
    },
    view: {
      type: GraphQLNonNull(View),
      description: 'View associated with the route',
    },
    accessGroups: {
      type: GraphQLList(UserGroup),
      description: 'Access groups required for accessing the route',
    },
  },
});

const RouteResponse = generateTemplateResponse(Route);
const RouteResponseList = generateTemplateResponse(GraphQLList(Route));

export const RouteQuery = {
  routes: {
    type: RouteResponseList,
    description: 'List of available routes',
    resolve: async (_, __, { user }) => graphqlWrapper(getRouteList(user)),
  },

  route: {
    type: RouteResponse,
    description: 'Get route by path',
    args: {
      path: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique path',
      },
    },
    resolve: async (_, { path }, { user }) => graphqlWrapper(getRouteByPathOrDefault(path, user)),
  },

  routeByView: {
    type: RouteResponseList,
    description: 'Get route by view',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }, { user }) => graphqlWrapper(getRouteByView(key, user)),
  },

  defaultRoute: {
    type: RouteResponse,
    description: 'Get default application route',
    resolve: async () => graphqlWrapper(getDefaultRoute()),
  },
};

export const RouteMutation = {
  addRoute: {
    type: RouteResponse,
    description: 'Add new route',
    args: {
      path: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique path',
      },
      view: {
        type: GraphQLNonNull(GraphQLString),
        description: 'View key',
      },
      accessGroups: {
        type: GraphQLList(GraphQLString),
        description: 'Access groups required for accessing the route',
      },
    },
    resolve: async (_, {
      path, view, accessGroups,
    }) => graphqlWrapper(addRoute(path, view, accessGroups), 201),
  },

  addOrUpdateRoute: {
    type: RouteResponse,
    description: 'Add or update route',
    args: {
      path: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique path',
      },
      view: {
        type: GraphQLNonNull(GraphQLString),
        description: 'View key',
      },
      accessGroups: {
        type: GraphQLList(GraphQLString),
        description: 'Access groups required for accessing the route',
      },
    },
    resolve: async (_, {
      path, view, accessGroups,
    }) => graphqlWrapper(addOrUpdateRoute(path, view, accessGroups)),
  },

  updateRoute: {
    type: RouteResponse,
    description: 'Update existing route',
    args: {
      path: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique path',
      },
      newPath: {
        type: GraphQLString,
        description: 'New path',
      },
      view: {
        type: GraphQLNonNull(GraphQLString),
        description: 'View key',
      },
      accessGroups: {
        type: GraphQLList(GraphQLString),
        description: 'Access groups required for accessing the route',
      },
    },
    resolve: async (_, {
      path, newPath, view, accessGroups,
    }) => graphqlWrapper(updateRoute(path, newPath, view, accessGroups)),
  },

  removeRoute: {
    type: RouteResponse,
    description: 'Remove route by key',
    args: {
      path: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique path',
      },
    },
    resolve: async (_, { path }) => graphqlWrapper(removeRoute(path)),
  },
};
