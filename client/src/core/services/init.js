import axios from 'axios';
import { query } from 'gql-query-builder';

async function initialize() {
  const response = await axios.post('http://localhost:4000/api', query({
    operation: 'defaultRoute',
    fields: ['path'],
  }));

  return response.data.data.routes;
}

export default initialize;
