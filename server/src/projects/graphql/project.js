import {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import {
  addProject, getProjectById, getProjectList, removeProject, updateProject,
} from '../dao/project';

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

export const ProjectQuery = {
  projects: {
    type: GraphQLList(Project),
    description: 'List of projects',
    resolve: async () => getProjectList(),
  },

  project: {
    type: GraphQLNonNull(Project),
    description: 'Get project by _id',
    args: {
      _id: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique ID',
      },
    },
    resolve: async (_, { _id }) => getProjectById(_id),
  },
};

export const ProjectMutation = {
  addProject: {
    type: Project,
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
    }) => addProject(name, description, imageUrl, link),
  },

  updateProject: {
    type: Project,
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
    }) => updateProject(_id, name, description, imageUrl, link),
  },

  removeProject: {
    type: Project,
    description: 'Remove project by _id',
    args: {
      _id: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique ID',
      },
    },
    resolve: async (_, { _id }) => removeProject(_id),
  },
};
