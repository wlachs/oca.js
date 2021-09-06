import { graphqlHTTP } from 'express-graphql';
import jwt from 'express-jwt';
import { ADMIN_USER_GROUP, STANDARD_USER_GROUP } from '../auth/constants';
import getConfig from '../config';
import { adminSchema, guestSchema, restrictedSchema } from './index';
import { JWT_ALGORITHM, JWT_SECRET } from '../config/secrets';
import { emptyMW } from '../utils/express-utils';

export function applyGraphqlSchemaMW(request, response, next) {
  const { graphiql } = getConfig();

  if (!request.user) {
    return next('Error, user not authenticated!');
  }

  if (request.user.groups.indexOf(ADMIN_USER_GROUP) !== -1) {
    return graphqlHTTP({
      graphiql,
      schema: adminSchema,
    })(request, response, next);
  }

  if (request.user.groups.indexOf(STANDARD_USER_GROUP) !== -1) {
    return graphqlHTTP({
      graphiql,
      schema: restrictedSchema,
    })(request, response, next);
  }

  return graphqlHTTP({
    graphiql,
    schema: guestSchema,
  })(request, response, next);
}

export function applyTokenIfPresentMW(request, response, next) {
  if (request.headers.authorization) {
    return jwt({
      secret: JWT_SECRET,
      algorithms: [JWT_ALGORITHM],
    })(request, response, next);
  }

  return emptyMW(request, response, next);
}
