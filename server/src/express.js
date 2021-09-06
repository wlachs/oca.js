import { Router } from 'express';
import getConfig from './config';
import { asyncMW, conditionalMW } from './utils/express-utils';
import { fakePopulateAdminUserMW, populateUserGroupsMW } from './auth/middleware/populateUserGroupsMW';
import { applyGraphqlSchemaMW, applyTokenIfPresentMW } from './graphql/middleware';

const router = new Router();
const { auth } = getConfig();

router.use('/',
  [
    /* Conditional middleware, if authentication is enabled,
     * verify access, otherwise use fake admin token
     */
    conditionalMW(auth.enabled,
      /* Check if there is an authorization header provided */
      applyTokenIfPresentMW,
      /* If authentication is turned off, inject admin user into the request */
      asyncMW(fakePopulateAdminUserMW)),
    /* Include user access groups to request */
    asyncMW(populateUserGroupsMW),
    /* Apply GraphQL schema based on access level */
    applyGraphqlSchemaMW,
  ]);

export default router;
