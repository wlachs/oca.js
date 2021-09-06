import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import { View } from './view';
import { UserGroup } from '../../auth/graphql/user_group';
import {
  addOrUpdateRoute,
  addRoute,
  getRouteByPathOrDefault,
  getRouteByView,
  getRouteList,
  removeRoute,
  updateRoute,
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
    accessGroups: {
      type: GraphQLList(UserGroup),
      description: 'Access groups required for accessing the route',
    },
  },
});

export const RouteQuery = {
  routes: {
    type: GraphQLList(Route),
    description: 'List of available routes',
    resolve: async (_, __, { user }) => getRouteList(user),
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
    resolve: async (_, { path }, { user }) => getRouteByPathOrDefault(path, user),
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
    resolve: async (_, { key }, { user }) => getRouteByView(key, user),
  },

  defaultRoute: {
    type: GraphQLNonNull(Route),
    description: 'Get default application route',
    resolve: async (_, __, { user }) => getDefaultRoute(user),
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
      accessGroups: {
        type: GraphQLList(GraphQLString),
        description: 'Access groups required for accessing the route',
      },
    },
    resolve: async (_, { path, view, accessGroups }) => addRoute(path, view, accessGroups),
  },

  addOrUpdateRoute: {
    type: Route,
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
    resolve: async (_, { path, view, accessGroups }) => addOrUpdateRoute(path, view, accessGroups),
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
      accessGroups: {
        type: GraphQLList(GraphQLString),
        description: 'Access groups required for accessing the route',
      },
    },
    resolve: async (_, {
      path, newPath, view, accessGroup,
    }) => updateRoute(path, newPath, view, accessGroup),
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
