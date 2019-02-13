export * from './debug';
export * from './checkPermissions';
export * from './secured';
export * from './renderAuthorized';

/**
 * Is promise
 *
 * @param {*} promise
 * @returns {promise is Promise<any>}
 */
export const isPromise = (promise: any): promise is Promise<any> => (
  !!promise &&
  (typeof promise === 'object' || typeof promise === 'function') &&
  typeof promise.then === 'function'
);
