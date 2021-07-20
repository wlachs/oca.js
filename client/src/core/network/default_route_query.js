import axios from 'axios';
import { query } from 'gql-query-builder';

/* TODO: replace API URL */
async function defaultRouteQuery() {
  const response = await axios.post('http://localhost:4000/api', query({
    operation: 'defaultRoute',
    fields: [
      'path',
      {
        view: [
          {
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
          },
          {
            template: ['key'],
          },
        ],
      }],
  }));

  return response.data.data.defaultRoute;
}

export default defaultRouteQuery;
