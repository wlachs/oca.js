import axios from 'axios';
import { query } from 'gql-query-builder';
import apiEndpoint from '../config/api_config';
import extractNetworkResponse from '../utils/extract_network_response';

async function defaultRouteQuery() {
  const response = await axios.post(apiEndpoint(), query({
    operation: 'defaultRoute',
    fields: [
      'statusCode',
      'message',
      {
        node: [
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
          },
        ],
      },
    ],
  }));

  return extractNetworkResponse(response.data.data.defaultRoute);
}

export default defaultRouteQuery;
