interface Deffered<T> {
  promise: Promise<T>;
  resolve: (resolveValue: T) => void;
  reject: (error?: Error) => void;
}

const defer = function <T>(): Deffered<T> {
  let resolve: (resolveValue: T) => void;
  let reject: () => void;

  const promise = new Promise<T>((innerResolve, innerReject): void => {
    resolve = innerResolve;
    reject = innerReject;
  });

  return {
    promise,

    // @ts-expect-error dudida
    resolve,

    // @ts-expect-error dudida
    reject
  };
};

export {
  defer
};
