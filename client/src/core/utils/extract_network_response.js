import GenericApiError from '../errors/generic_api_error';

function extractNetworkResponse({ message, statusCode, node }) {
  if (statusCode >= 200 && statusCode < 300) {
    return node;
  }
  throw new GenericApiError(message, statusCode);
}

export default extractNetworkResponse;
