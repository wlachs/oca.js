/* GraphQL imports */
import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

/* DAO references */
import {
  addProject, getProjectById, getProjectList, removeProject, updateProject,
} from '../dao/project';

/* Wrapper */
import { generateTemplateResponse, graphqlWrapper } from '../../core/graphql/wrapper';

export const Project = new GraphQLObjectType({
  name: 'Project',
  description: 'Data type for representing projects and contributions.',
  fields: {
    _id: {
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
    description: 'Get project by _id',
    args: {
      _id: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique ID',
      },
    },
    resolve: async (_, { _id }) => graphqlWrapper(getProjectById(_id)),
  },
};

export const ProjectMutation = {
  addProject: {
    type: ProjectResponse,
    description: 'Add new project',
    args: {
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
      name, description, imageUrl, link,
    }) => graphqlWrapper(addProject(name, description, imageUrl, link), 201),
  },

  updateProject: {
    type: ProjectResponse,
    description: 'Update existing project',
    args: {
      _id: {
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
      _id, name, description, imageUrl, link,
    }) => graphqlWrapper(updateProject(_id, name, description, imageUrl, link)),
  },

  removeProject: {
    type: ProjectResponse,
    description: 'Remove project by _id',
    args: {
      _id: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique ID',
      },
    },
    resolve: async (_, { _id }) => graphqlWrapper(removeProject(_id)),
  },
};
