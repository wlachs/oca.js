import axios from 'axios';
import { query } from 'gql-query-builder';

/* TODO: replace API URL */
async function initialize() {
  const response = await axios.post('http://localhost:4000/api', query({
    operation: 'defaultRoute',
    fields: ['path'],
  }));

  return response.data.data.defaultRoute.path;
}

export default initialize;
