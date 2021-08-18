import axios from 'axios';
import { query } from 'gql-query-builder';
import { apiEndpoint } from '../config/api_config';

async function routeQuery(path) {
  const response = await axios.post(apiEndpoint(), query({
    operation: 'route',
    variables: { path: { value: path, required: true } },
    fields: [
      'path',
      {
        view: [
          'pageTitle',
          {
            content: [
              {
                slot: ['key'],
              },
              {
                content: [
                  'key',
                  {
                    type: ['key'],
                  },
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

  return response.data.data.route;
}

export default routeQuery;
