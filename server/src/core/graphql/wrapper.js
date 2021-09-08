async function graphqlWrapper(promise, SUCCESS = 200) {
  try {
    const node = await promise;
    return {
      message: 'OK',
      statusCode: SUCCESS,
      node,
    };
  } catch (e) {
    return {
      message: e.message,
      statusCode: e.statusCode || 500,
    };
  }
}

export default graphqlWrapper;
