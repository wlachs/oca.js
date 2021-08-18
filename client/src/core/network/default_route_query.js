import axios from 'axios';
import { query } from 'gql-query-builder';
import { apiEndpoint } from '../config/api_config';

async function defaultRouteQuery() {
  const response = await axios.post(apiEndpoint(), query({
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
