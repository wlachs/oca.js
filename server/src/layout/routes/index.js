import log from 'npmlog';
import { Router } from 'express';
import graphqlRouter from './graphql';

const LOG_PREFIX = 'LAYOUT_ROUTES';
const router = new Router();

log.info(LOG_PREFIX, 'init graphql router');

router.use('/graphql', graphqlRouter);

export default router;
