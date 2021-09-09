import axios from 'axios';
import { query } from 'gql-query-builder';
import apiEndpoint from '../config/api_config';
import { DEVELOPMENT } from '../config/environment';
import returnAfter from '../utils/delayed_execution';
import extractNetworkResponse from '../utils/extract_network_response';

async function routeQuery(path, bearer) {
  const endpoint = apiEndpoint();
  let headers = null;

  if (bearer) {
    headers = { Authorization: `Bearer ${bearer}` };
  }

  const response = await axios.post(endpoint, query({
    operation: 'route',
    variables: { path: { value: path, required: true } },
    fields: [
      'statusCode',
      'message',
      {
        node: [
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
          },
        ],
      },
    ],
  }), { headers });

  const extractedResponse = extractNetworkResponse(response.data.data.route);

  /* Introduce delay on dev */
  if (process.env.NODE_ENV === DEVELOPMENT) {
    return returnAfter(extractedResponse, 1000);
  }

  return extractedResponse;
}

export default routeQuery;
