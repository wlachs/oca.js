async function returnAfter(value, afterTime) {
  return new Promise((resolve) => setTimeout(resolve, afterTime, value));
}

export default returnAfter;
