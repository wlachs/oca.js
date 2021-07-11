import { Router } from 'express';
import { GraphQLSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import {
  AdminMutationType, AdminQueryType, GuestQueryType,
} from '../graphql';
import getConfig from '../../config';

const router = new Router();
const { graphiql } = getConfig();

const querySchema = new GraphQLSchema({
  query: GuestQueryType,
});

const adminSchema = new GraphQLSchema({
  query: AdminQueryType,
  mutation: AdminMutationType,
});

router.use('/admin',
  graphqlHTTP({
    graphiql,
    schema: adminSchema,
  }));

router.use('/',
  graphqlHTTP({
    graphiql,
    schema: querySchema,
  }));

export default router;
