export function suspender(promise) {
  let result;

  const suspense = Promise.resolve(promise)
    .then(data => {
      result = [null, data];
    })
    .catch(err => {
      result = [err, null];
    });

  return {
    read() {
      if (!result) {
        // lol all you need to do
        // is to throw a promise, then React
        // will resume the rendering process
        // once this promise fulfills
        throw suspense
      }

      return result;
    }
  }
}