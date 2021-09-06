import axios from 'axios';
import { query } from 'gql-query-builder';
import apiEndpoint from '../../core/config/api_config';

async function projectListQuery() {
  const response = await axios.post(apiEndpoint(), query({
    operation: 'projects',
    fields: ['_id', 'name', 'description', 'imageUrl', 'link'],
  }));

  return response.data.data.projects;
}

export default projectListQuery;
