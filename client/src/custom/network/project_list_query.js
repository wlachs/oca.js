import axios from 'axios';
import { query } from 'gql-query-builder';

/* TODO: replace API URL */
async function projectListQuery() {
  const response = await axios.post('http://localhost:4000/api', query({
    operation: 'projects',
    fields: ['_id', 'name', 'description', 'imageUrl', 'link'],
  }));

  return response.data.data.projects;
}

export default projectListQuery;
