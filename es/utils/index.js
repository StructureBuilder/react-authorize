import * as React from 'react';
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
export var isPromise = function (promise) { return (!!promise &&
    (typeof promise === 'object' || typeof promise === 'function') &&
    typeof promise.then === 'function'); };
/**
 * Check is VNode, if not, return VNode as well.
 *
 * @param {*} Target
 * @returns
 */
export function checkIsVNode(Target) {
    if (!Target || React.isValidElement(Target)) {
        return Target;
    }
    return React.createElement(Target, null);
}
