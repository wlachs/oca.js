import axios from 'axios';
import { query } from 'gql-query-builder';
import apiEndpoint from '../config/api_config';
import extractNetworkResponse from '../utils/extract_network_response';

async function authentication(userID, password, referer) {
  const response = await axios.post(apiEndpoint(), query({
    operation: 'authenticate',
    variables: {
      userID: { value: userID, required: true },
      password: { value: password, required: true },
      referer: { value: referer, required: true },
    },
    fields: [
      'statusCode',
      'message',
      {
        node: [
          'bearer',
          {
            redirect: [
              {
                redirect: ['path'],
              },
            ],
          },
        ],
      },
    ],
  }));
  return extractNetworkResponse(response.data.data.authenticate);
}

export default authentication;
