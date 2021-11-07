/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

/* DAO references */
import {
  addOrUpdateProject,
  addProject,
  getProjectByKey,
  getProjectList,
  removeProjectByKey,
  updateProject,
} from '../dao/project';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';

export const Project = new GraphQLObjectType({
  name: 'Project',
  description: 'Data type for representing projects and contributions.',
  fields: {
    key: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique ID',
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Project name',
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Project description',
    },
    imageUrl: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Project image URL',
    },
    link: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Project link',
    },
  },
});

const ProjectResponse = generateTemplateResponse(Project);
const ProjectResponseList = generateTemplateResponse(GraphQLList(Project));

export const ProjectQuery = {
  projects: {
    type: ProjectResponseList,
    description: 'List of projects',
    resolve: async () => graphqlWrapper(getProjectList()),
  },

  project: {
    type: ProjectResponse,
    description: 'Get project by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique ID',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(getProjectByKey(key)),
  },
};

export const ProjectMutation = {
  addProject: {
    type: ProjectResponse,
    description: 'Add new project',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique ID',
      },
      name: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project name',
      },
      description: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project description',
      },
      imageUrl: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project image URL',
      },
      link: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project link',
      },
    },
    resolve: async (_, {
      key, name, description, imageUrl, link,
    }) => graphqlWrapper(addProject(key, name, description, imageUrl, link), 201),
  },

  updateProject: {
    type: ProjectResponse,
    description: 'Update existing project',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique ID',
      },
      newKey: {
        type: GraphQLNonNull(GraphQLString),
        description: 'New unique ID',
      },
      name: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project name',
      },
      description: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project description',
      },
      imageUrl: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project image URL',
      },
      link: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project link',
      },
    },
    resolve: async (_, {
      key, newKey, name, description, imageUrl, link,
    }) => graphqlWrapper(updateProject(key, newKey, name, description, imageUrl, link)),
  },

  addOrUpdateProject: {
    type: ProjectResponse,
    description: 'Add or update existing project',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique ID',
      },
      name: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project name',
      },
      description: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project description',
      },
      imageUrl: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project image URL',
      },
      link: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project link',
      },
    },
    resolve: async (_, {
      key, name, description, imageUrl, link,
    }) => graphqlWrapper(addOrUpdateProject(key, name, description, imageUrl, link)),
  },

  removeProjectByKey: {
    type: ProjectResponse,
    description: 'Remove project by key',
    args: {
      key: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique ID',
      },
    },
    resolve: async (_, { key }) => graphqlWrapper(removeProjectByKey(key)),
  },
};
