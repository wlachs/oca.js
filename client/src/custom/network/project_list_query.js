import axios from 'axios';
import { query } from 'gql-query-builder';
import apiEndpoint from '../../core/config/api_config';
import extractNetworkResponse from '../../core/utils/extract_network_response';

async function projectListQuery() {
  const response = await axios.post(apiEndpoint(), query({
    operation: 'projects',
    fields: [
      'statusCode',
      'message',
      {
        node: ['key', 'name', 'description', 'imageUrl', 'link'],
      },
    ],
  }));

  return extractNetworkResponse(response.data.data.projects);
}

export default projectListQuery;
