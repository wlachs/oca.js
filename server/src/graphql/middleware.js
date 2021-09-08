/* Logging */
import log from 'npmlog';

/* Express */
import { graphqlHTTP } from 'express-graphql';
import jwt, { UnauthorizedError } from 'express-jwt';
import { emptyMW } from '../utils/express-utils';

/* Constants and configuration */
import { ADMIN_USER_GROUP, STANDARD_USER_GROUP } from '../auth/constants';
import { JWT_ALGORITHM, JWT_SECRET } from '../config/secrets';
import getConfig from '../config';

/* GraphQL */
import { adminSchema, guestSchema, restrictedSchema } from './index';

/* Logging prefix */
const LOG_PREFIX = 'GRAPHQL_MIDDLEWARE';

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

export function genericErrorHandlerMW(error, request, response, next) {
  log.error(LOG_PREFIX, 'generic error handler', error.message);

  if (error instanceof UnauthorizedError) {
    return response.status(401).send(error.message);
  }

  return next(error);
}
