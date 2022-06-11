import axios from 'axios';
import { query } from 'gql-query-builder';
import apiEndpoint from '../../core/config/api_config';
import extractNetworkResponse from '../../core/utils/extract_network_response';

async function customListQuery(modelKey) {
  const response = await axios.post(apiEndpoint(), query({
    operation: 'customList',
    variables: { modelKey: { value: modelKey, required: true } },
    fields: [
      'statusCode',
      'message',
      {
        node: [
          'key',
          {
            params: ['key', 'value'],
          },
        ],
      },
    ],
  }));

  return extractNetworkResponse(response.data.data.customList);
}

export default customListQuery;
