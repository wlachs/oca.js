import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import { View } from './view';
import {
  addRoute, getRouteByPath, getRouteByView, getRouteList, removeRoute, updateRoute,
} from '../dao/route';
import { getDefaultRoute } from '../services/route';

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
  },
});

export const RouteQuery = {
  routes: {
    type: GraphQLList(Route),
    description: 'List of available routes',
    resolve: async () => getRouteList(),
  },

  route: {
    type: GraphQLNonNull(Route),
    description: 'Get route by path',
    args: {
      path: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique path',
      },
    },
    resolve: async (_, { path }) => getRouteByPath(path),
  },

  routeByView: {
    type: GraphQLList(Route),
    description: 'Get route by view',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique key',
      },
    },
    resolve: async (_, { key }) => getRouteByView(key),
  },

  defaultRoute: {
    type: GraphQLNonNull(Route),
    description: 'Get default application route',
    resolve: async () => getDefaultRoute(),
  },
};

export const RouteMutation = {
  addRoute: {
    type: Route,
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
    },
    resolve: async (_, { path, view }) => addRoute(path, view),
  },

  updateRoute: {
    type: Route,
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
    },
    resolve: async (_, { path, newPath, view }) => updateRoute(path, newPath, view),
  },

  removeRoute: {
    type: Route,
    description: 'Remove route by key',
    args: {
      path: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique path',
      },
    },
    resolve: async (_, { path }) => removeRoute(path),
  },
};
