import axios from 'axios';
import { query } from 'gql-query-builder';

/* TODO: replace API URL */
async function routeQuery(path) {
  const response = await axios.post('http://localhost:4000/api', query({
    operation: 'route',
    variables: { path: { value: path, required: true } },
    fields: [
      'path',
      {
        view: [{
          content: [
            {
              slot: ['key'],
            },
            {
              content: [
                'key',
                {
                  attributes: ['key', 'value'],
                },
              ],
            },
          ],
        }],
      }],
  }));

  return response.data.data.route;
}

export default routeQuery;
